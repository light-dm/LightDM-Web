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
ZAMMAD_BODY = """<button id="ldm-chat-btn" aria-label="Chat öffnen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js"></script>
<script>(function(){
var btn=document.getElementById('ldm-chat-btn');
var _online=false;
function initZ(){
  new ZammadChat({chatId:1,show:false,cssAutoload:false});
}
btn.addEventListener('click',function(){
  var chatEl=document.querySelector('.zammad-chat');
  if(chatEl&&document.body.contains(chatEl)){
    var h=chatEl.querySelector('.zammad-chat-header');
    if(h)h.click();
  } else {
    window.location.href='mailto:info@light-dm.de?subject=Support-Anfrage%20%E2%80%93%20LightDM';
  }
});
if(document.readyState==='complete'){setTimeout(initZ,500);}
else{window.addEventListener('load',function(){setTimeout(initZ,500);});}
new MutationObserver(function(){if(btn&&!document.body.contains(btn))document.body.appendChild(btn);}).observe(document.body,{childList:true});
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

    # 4. Alle alten Zammad/Button-Blöcke vor </body> entfernen
    html = re.sub(
        r'<button id="ldm-zammad-btn".*?</script>\s*(?=</body>)',
        '', html, flags=re.DOTALL
    )
    # Auch plain script-Block entfernen falls schon vorhanden
    html = re.sub(
        r'<script src="https://ticket\.light-dm\.de/assets/chat/chat-no-jquery\.min\.js"></script>\s*<script>new ZammadChat[^<]*</script>\s*(?=</body>)',
        '', html, flags=re.DOTALL
    )

    # 5. Neuen Block direkt vor </body> einfügen
    if '</body>' in html and 'chat-no-jquery.min.js' not in html:
        html = html.replace('</body>', ZAMMAD_BODY + '\n</body>')

    if html != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        changed += 1
        print(f'  OK {os.path.relpath(path, ROOT)}')

print(f'\nDone - {changed}/{len(html_files)} files updated.')
