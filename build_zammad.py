#!/usr/bin/env python3
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

ZAMMAD_BODY = """<button class="open-zammad-chat">Chat with us</button>
<script src="https://ticket.light-dm.de/assets/chat/chat-no-jquery.min.js"></script>
<script>(function() {
  new ZammadChat({
    fontSize: '12px',
    chatId: 1,
    show: false
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
