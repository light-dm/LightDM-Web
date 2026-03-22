"""
Inline chatbot.js minified into all HTML files (same pattern as cursor).
Uses window.load so it fires AFTER React hydration.
"""
import re, os, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

# ── Read & minify chatbot.js ────────────────────────────────────────────────
src = open(os.path.join(ROOT, 'chatbot.js'), encoding='utf-8').read()

# Remove only block comments (NOT // — would break https:// URLs)
src = re.sub(r'/\*.*?\*/', '', src, flags=re.DOTALL)

# Strip the IIFE wrapper: (function () { ... })();
# Everything inside the IIFE
src = re.sub(r"^\(function\s*\(\)\s*\{", '', src.strip())
src = re.sub(r"\}\s*\)\s*\(\s*\)\s*;?\s*$", '', src.strip())

# Remove 'use strict'; line
src = re.sub(r"'use strict';\s*", '', src)

# Remove ALL bare buildWidget() calls (can appear mid-source or at end)
src = re.sub(r'^\s*buildWidget\(\);\s*$', '', src, flags=re.MULTILINE)

# Collapse whitespace
src = re.sub(r'[ \t]+', ' ', src)
src = re.sub(r'\n[ \t]*', '\n', src)
src = re.sub(r'\n{2,}', '\n', src)
src = src.strip()

# Wrap with window.load. After buildWidget(), a MutationObserver re-appends
# the elements if React reconciliation removes them from body.
INLINE = (
    "<script>(function(){"
    "function _run(){"
    "if(document.getElementById('ldm-chat-btn'))return;"
    + src +
    "\nbuildWidget();"
    # grab references and guard against React removing them
    "var _b=document.getElementById('ldm-chat-btn');"
    "var _p=document.getElementById('ldm-chat-panel');"
    "if(_b&&_p){"
    "new MutationObserver(function(){"
    "if(!document.body.contains(_b)){document.body.appendChild(_b);document.body.appendChild(_p);}"
    "}).observe(document.body,{childList:true});"
    "}"
    "}"
    "window.addEventListener('load',_run);"
    "if(document.readyState==='complete')setTimeout(_run,50);"
    "})();</script>"
)

print(f"Inline chatbot size: {len(INLINE)} chars ({len(INLINE)//1024}KB)")

# ── Clean and inject into all HTML files ────────────────────────────────────
files = glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
changed = 0

for f in files:
    if any(x in f for x in ['build_chatbot']):
        continue

    content = open(f, encoding='utf-8').read()

    # Remove old loader / inline chatbot references
    content = re.sub(r'<script>\(function\(\)\{.*?ldm-chat-btn.*?</script>\n?', '', content, flags=re.DOTALL)
    content = re.sub(r'<script src="/chatbot\.js"[^>]*></script>\n?', '', content)

    # Skip if chatbot CSS not injected (wrong file)
    if 'chatbot.css' not in content:
        continue

    # Skip if already inlined
    if 'ldm-chat-btn' in content and 'buildWidget' in content:
        continue

    # Insert inline before </html>
    if '</html>' not in content:
        continue

    content = content.replace('</html>', INLINE + '\n</html>', 1)
    open(f, 'w', encoding='utf-8').write(content)
    changed += 1

print(f'Inlined chatbot into {changed} HTML files')
