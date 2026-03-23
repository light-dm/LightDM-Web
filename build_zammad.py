#!/usr/bin/env python3
"""
build_zammad.py — v4
- Zammad script als statischer <script src> direkt vor </body>
- JS setProperty('important') overrides Zammad's inline styles → correct position
- Offline-Fallback: click → mailto wenn kein Agent online
- Mirror-Observer: Zammad button state → unseren Button stylen
"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

# ── Button-CSS + Zammad script + ZammadChat init — direkt vor </body> ──
ZAMMAD_BODY = r"""<button id="ldm-zammad-btn" aria-label="Chat öffnen"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></button>
<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js"></script>
<script>(function(){
new ZammadChat({chatId:1,show:false,buttonClass:'zammad-ldm-internal',inactiveClass:'is-inactive',cssAutoload:false,title:'<b>LightDM<\/b> Support',fontSize:'14px',flat:true});
var btn=document.getElementById('ldm-zammad-btn');
var _opened=false;
// ── Position + Auto-Hide Fix ──
function fixPos(){
  var c=document.querySelector('.zammad-chat');
  if(!c)return;
  if(c.parentElement!==document.body)document.body.appendChild(c);
  var m=window.innerWidth<=480;
  c.style.setProperty('position','fixed','important');
  c.style.setProperty('z-index','50000','important');
  c.style.setProperty('bottom',m?'5rem':'5.5rem','important');
  c.style.setProperty('right',m?'1rem':'2rem','important');
  c.style.setProperty('left',m?'1rem':'auto','important');
  c.style.setProperty('top','auto','important');
  c.style.setProperty('width',m?'calc(100vw - 2rem)':'360px','important');
  c.style.setProperty('max-width','calc(100vw - 2rem)','important');
  // Zammad ignores show:false → wir erzwingen geschlossen bis User klickt
  if(!_opened)c.style.setProperty('display','none','important');
}
var _fp=setInterval(fixPos,200);setTimeout(function(){clearInterval(_fp);},6000);
window.addEventListener('resize',fixPos);
// Wenn Zammad's X-Button die Chat schließt → State sync
var _cObs=setInterval(function(){
  var c=document.querySelector('.zammad-chat');
  if(!c)return;
  clearInterval(_cObs);
  new MutationObserver(function(){
    if(c.style.display==='none'||window.getComputedStyle(c).display==='none')_opened=false;
  }).observe(c,{attributes:true,attributeFilter:['style','class']});
},300);
// ── Mirror Zammad-Button-State → unseren Button ──
var _ms=setInterval(function(){
  var zb=document.querySelector('.zammad-ldm-internal');
  if(!btn||!zb)return;
  btn.classList.toggle('ldm-offline',zb.classList.contains('zammad-chat-is-hidden'));
  btn.classList.toggle('is-inactive',zb.classList.contains('is-inactive'));
},500);
setTimeout(function(){clearInterval(_ms);},10000);
// ── Klick: toggle chat oder offline→E-Mail ──
if(btn){
  btn.addEventListener('click',function(){
    if(btn.classList.contains('is-inactive'))return;
    var c=document.querySelector('.zammad-chat');
    if(_opened){
      // Schließen
      _opened=false;
      if(c)c.style.setProperty('display','none','important');
      return;
    }
    // Offline-Check via agent-status
    var st=document.querySelector('.zammad-chat-agent-status');
    var offline=!st||st.classList.contains('zammad-chat-is-hidden');
    if(offline){
      window.location.href='mailto:info@light-dm.de?subject=Support-Anfrage%20%E2%80%93%20LightDM%20Website';
      return;
    }
    // Öffnen: force-show + Zammad-Header klicken (interner Toggle)
    _opened=true;
    if(c){
      fixPos();
      c.style.setProperty('display','block','important');
      var h=c.querySelector('.js-chat-open');
      if(h)h.click();
    }
  });
}
})();</script>
<script>(function(){
var btn=document.getElementById('ldm-zammad-btn');
if(!btn)return;
new MutationObserver(function(){
  if(!document.body.contains(btn))document.body.appendChild(btn);
}).observe(document.body,{childList:true});
})();</script>"""

html_files = (
    glob.glob(os.path.join(ROOT, '*.html')) +
    glob.glob(os.path.join(ROOT, '*', 'index.html')) +
    glob.glob(os.path.join(ROOT, '*', '*', 'index.html'))
)
html_files = [f for f in html_files if '.claude' not in f.replace(ROOT, '')]

changed = 0
for path in sorted(html_files):
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    original = html

    # 1. chatbot.css → zammad-chat.css
    html = html.replace(
        '<link rel="stylesheet" href="/chatbot.css">',
        '<link rel="stylesheet" href="/zammad-chat.css">'
    )

    # 2. Alle alten Zammad/chatbot inline Blöcke entfernen
    html = re.sub(r'<script>\(function\(\)\{.*?buildWidget\(\).*?}\)\(\);</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<script>\(function\(\)\{var WEBHOOK_URL.*?}\)\(\);</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<script>\(function\(\)\{function _run\(\).*?}\)\(\);</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<script>\(function\(\)\{.*?MutationObserver.*?}\)\(\);</script>', '', html, flags=re.DOTALL)

    # 3. Alten defer-Script aus <head> entfernen
    html = html.replace(
        '<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js" defer></script>\n',
        ''
    )
    html = html.replace(
        '<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js" defer></script>',
        ''
    )

    # 4. Alten Button+Script-Block vor </body> entfernen falls vorhanden
    html = re.sub(
        r'<button id="ldm-zammad-btn".*?</script>\s*(?=</body>)',
        '', html, flags=re.DOTALL
    )

    # 5. Neuen Block direkt vor </body> einfügen
    if '</body>' in html and 'ldm-zammad-btn' not in html:
        html = html.replace('</body>', ZAMMAD_BODY + '\n</body>')

    if html != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        changed += 1
        print(f'  OK {os.path.relpath(path, ROOT)}')

print(f'\nDone - {changed}/{len(html_files)} files updated.')
