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
ZAMMAD_BODY = """<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js"></script>
<script>(function(){
var _done=false;
function initZ(){
  if(_done)return;_done=true;
  new ZammadChat({chatId:1});
  var _el=null;
  // Warte bis Zammad sein Element erstellt hat, dann ref speichern
  var t=setInterval(function(){
    var el=document.querySelector('.zammad-chat');
    if(el){_el=el;clearInterval(t);}
  },50);
  setTimeout(function(){clearInterval(t);},3000);
  // React entfernt das Element beim Reconcile → sofort wieder anhängen
  new MutationObserver(function(){
    if(_el&&!document.body.contains(_el)){document.body.appendChild(_el);}
  }).observe(document.body,{childList:true});
}
// Nach window.load + 500ms → React-Hydration ist durch
if(document.readyState==='complete'){setTimeout(initZ,500);}
else{window.addEventListener('load',function(){setTimeout(initZ,500);});}
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
