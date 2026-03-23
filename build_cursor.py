#!/usr/bin/env python3
"""
build_cursor.py
Injects the custom cursor JS into all HTML files.
Uses gc() pattern (re-fetch elements every rAF frame) to survive React navigation.
Uses window.load to inject after React hydration.
"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

CURSOR_SCRIPT = r"""<script>(function(){
function _cursor(){
  var dot=document.querySelector('.cursor-dot');
  var ring=document.querySelector('.cursor-ring');
  if(!dot){
    dot=document.createElement('div');dot.className='cursor-dot';
    document.body.appendChild(dot);
  }
  if(!ring){
    ring=document.createElement('div');ring.className='cursor-ring';
    document.body.appendChild(ring);
  }
  return {dot:dot,ring:ring};
}
var mx=window.innerWidth/2,my=window.innerHeight/2;
var rx=mx,ry=my;
var ticking=false;
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;},{ passive:true });
function loop(){
  var c=_cursor();
  c.dot.style.left=mx+'px';c.dot.style.top=my+'px';
  rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
  c.ring.style.left=rx+'px';c.ring.style.top=ry+'px';
  requestAnimationFrame(loop);
}
document.addEventListener('mouseover',function(e){
  var t=e.target;
  if(t&&(t.tagName==='A'||t.tagName==='BUTTON'||t.closest('a')||t.closest('button'))){
    var c=_cursor();if(c.ring)c.ring.classList.add('hovering');
  }
},{passive:true});
document.addEventListener('mouseout',function(e){
  var t=e.target;
  if(t&&(t.tagName==='A'||t.tagName==='BUTTON'||t.closest('a')||t.closest('button'))){
    var c=_cursor();if(c.ring)c.ring.classList.remove('hovering');
  }
},{passive:true});
function start(){_cursor();loop();}
window.addEventListener('load',start);
if(document.readyState==='complete')setTimeout(start,50);
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

    # Remove any existing cursor script blocks
    html = re.sub(
        r'<script>\(function\(\)\{function _cursor\(\).*?}\)\(\);</script>',
        '', html, flags=re.DOTALL
    )
    # Remove old cursor patterns (gc-based or similar)
    html = re.sub(
        r'<script>\(function\(\)\{var mx=.*?}\)\(\);</script>',
        '', html, flags=re.DOTALL
    )

    # Inject fresh cursor script before </html>
    if '</html>' in html:
        html = html.replace('</html>', CURSOR_SCRIPT + '\n</html>')

    if html != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        changed += 1
        print(f'  OK {os.path.relpath(path, ROOT)}')

print(f'\nDone - {changed}/{len(html_files)} files updated.')
