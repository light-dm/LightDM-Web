#!/usr/bin/env python3
"""
build_zammad.py
Replaces the old custom chatbot with Zammad live chat in all HTML files.
- Removes chatbot.css link  → adds zammad-chat.css
- Removes old inline chatbot script block
- Injects Zammad integration inline (window.load pattern, survives React)
"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

# ── defer script tag for <head> — Zammad reads its own src for host detection ──
ZAMMAD_HEAD = '<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js" defer></script>'

# ── Inline script before </html>: creates button + inits Zammad after load ──
ZAMMAD_SCRIPT = r"""<script>(function(){
function _run(){
  if(document.getElementById('ldm-zammad-btn'))return;
  // Create floating button — Zammad handles open/close via buttonClass
  var btn=document.createElement('button');
  btn.id='ldm-zammad-btn';
  btn.className='open-zammad-chat';
  btn.setAttribute('aria-label','Chat öffnen');
  btn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>';
  document.body.appendChild(btn);
  // Init ZammadChat — retry until defer script has executed
  function initChat(){
    if(!window.ZammadChat){setTimeout(initChat,100);return;}
    new ZammadChat({
      chatId:1,
      show:false,
      host:'https://ticket.light-dm.de',
      buttonClass:'open-zammad-chat',
      inactiveClass:'is-inactive',
      cssAutoload:false,
      title:'<b>LightDM</b> Support',
      fontSize:'14px',
      flat:true
    });
  }
  initChat();
  // Re-attach button if React navigation removes it
  new MutationObserver(function(){
    if(!document.body.contains(btn)){document.body.appendChild(btn);}
  }).observe(document.body,{childList:true});
}
window.addEventListener('load',_run);
if(document.readyState==='complete')setTimeout(_run,50);
})();</script>"""

# Pattern to remove the OLD inline chatbot block (everything between the marker comments or the huge script)
OLD_SCRIPT_RE = re.compile(
    r'<script>\(function\(\)\{.*?buildWidget\(\).*?}\)\(\);</script>',
    re.DOTALL
)
# Also remove a simpler variant without buildWidget
OLD_SCRIPT_RE2 = re.compile(
    r'<script>\(function\(\)\{var WEBHOOK_URL.*?}\)\(\);</script>',
    re.DOTALL
)

html_files = (
    glob.glob(os.path.join(ROOT, '*.html')) +
    glob.glob(os.path.join(ROOT, '*', 'index.html')) +
    glob.glob(os.path.join(ROOT, '*', '*', 'index.html'))
)
# Exclude nested .claude worktree copies
html_files = [f for f in html_files if '.claude' not in f.replace(ROOT, '')]

changed = 0
for path in sorted(html_files):
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # 1. Replace chatbot.css → zammad-chat.css
    html = html.replace(
        '<link rel="stylesheet" href="/chatbot.css">',
        '<link rel="stylesheet" href="/zammad-chat.css">'
    )

    # 2. Remove old inline chatbot script (the big one)
    html = OLD_SCRIPT_RE.sub('', html)
    html = OLD_SCRIPT_RE2.sub('', html)

    # 3. Remove any stray short ldm-chat-btn observer scripts
    html = re.sub(
        r'<script>[^<]*ldm-chat-btn[^<]*buildWidget[^<]*</script>',
        '', html, flags=re.DOTALL
    )

    # 4. Remove any old Zammad inline script (full _run block)
    html = re.sub(
        r'<script>\(function\(\)\{function _run\(\).*?}\)\(\);</script>',
        '', html, flags=re.DOTALL
    )

    # 5. Ensure Zammad defer script is in <head> (not duplicated)
    if 'chat-no-jquery.min.js' not in html:
        html = html.replace('</head>', ZAMMAD_HEAD + '\n</head>')

    # 6. Inject init script before </html>
    html = html.replace('</html>', ZAMMAD_SCRIPT + '\n</html>')

    if html != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        changed += 1
        print(f'  OK {os.path.relpath(path, ROOT)}')

print(f'\nDone — {changed}/{len(html_files)} files updated.')
