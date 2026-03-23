#!/usr/bin/env python3
"""
build_zammad.py — v3
Richtige Lösung: Zammad-Script als statischer <script src> direkt vor </body>.
Dann liest Zammad document.currentScript.src korrekt → host auto-detected.
buttonClass ist die Klasse, die Zammad seinem EIGENEN Button gibt — nicht unser
Button. Deshalb: Klick auf #ldm-zammad-btn → delegiert an Zammads internen Button.
"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

# ── Button-CSS + Zammad script + ZammadChat init — direkt vor </body> ──
# Zammad liest host aus dem <script src> Tag → kein host-Parameter nötig
ZAMMAD_BODY = r"""<button id="ldm-zammad-btn" aria-label="Chat öffnen"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></button>
<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js"></script>
<script>(function(){
// Zammad init — buttonClass ist NUR die CSS-Klasse für Zammads eigenen Button
new ZammadChat({chatId:1,show:false,buttonClass:'zammad-ldm-internal',inactiveClass:'is-inactive',cssAutoload:false,title:'<b>LightDM</b> Support',fontSize:'14px',flat:true});
// Unser Button delegiert den Klick an Zammads internen Button
var btn=document.getElementById('ldm-zammad-btn');
if(btn){
  btn.addEventListener('click',function(){
    // Zammads eigener Button hat Klasse 'zammad-ldm-internal'
    var zb=document.querySelector('.zammad-chat-button.zammad-ldm-internal,.zammad-ldm-internal');
    if(zb){zb.click();return;}
    // Fallback: erster .zammad-chat-button der nicht Send-Button ist
    var fb=document.querySelector('.zammad-chat-button:not(.zammad-chat-send):not(.js-send)');
    if(fb)fb.click();
  });
}
})();</script>
<script>(function(){
// Re-attach button nach React-Navigation
var btn=document.getElementById('ldm-zammad-btn');
if(!btn)return;
new MutationObserver(function(){
  if(!document.body.contains(btn)){
    document.body.appendChild(btn);
  }
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
