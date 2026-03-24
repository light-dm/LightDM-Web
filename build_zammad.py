#!/usr/bin/env python3
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

ZAMMAD_BODY = """<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js"></script>
<script>(function(){
  new ZammadChat({fontSize:'12px',chatId:1,show:false});
  var btn=document.createElement('button');
  btn.id='ldm-chat-btn';
  btn.setAttribute('aria-label','Chat öffnen');
  btn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>';
  document.body.appendChild(btn);
  btn.addEventListener('click',function(){
    var h=document.querySelector('.zammad-chat .js-chat-open');
    if(h)h.click();
  });
})();
</script>"""

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

    # Alles raus was vorher war
    html = re.sub(r'<button[^>]*(ldm-zammad-btn|ldm-chat-btn|open-zammad-chat)[^>]*>.*?</button>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<script src="https://ticket\.light-dm\.de/assets/chat/chat-no-jquery\.min\.js"[^>]*></script>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<script>\s*\(function\(\)[^<]*ZammadChat[^<]*\);\s*\}\)\(\);\s*</script>', '', html, flags=re.DOTALL)

    # Neu einfügen direkt vor </body>
    if '</body>' in html:
        html = html.replace('</body>', ZAMMAD_BODY + '\n</body>', 1)

    if html != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        changed += 1
        print(f'  OK {os.path.relpath(path, ROOT)}')

print(f'\nDone - {changed}/{len(html_files)} files updated.')
