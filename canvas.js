/* LightDM — Soft Neural Canvas Background
   Fixed overlay, runs sitewide. */
(function(){
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var nodes = [], mouse = { x: -9999, y: -9999 }, W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Node() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r  = Math.random() * 1.5 + 0.8;
    this.opacity = Math.random() * 0.4 + 0.15;
  }

  function init() {
    resize();
    nodes = [];
    var c = Math.floor((W * H) / 14000);
    for (var i = 0; i < c; i++) nodes.push(new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var MD = 160;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var m = nodes[j];
        var dx = n.x - m.x, dy = n.y - m.y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MD) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = 'rgba(245,197,24,' + (1 - d / MD) * 0.18 + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    for (var i = 0; i < nodes.length; i++) {
      var n  = nodes[i];
      var dx = n.x - mouse.x, dy = n.y - mouse.y;
      var d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 200) {
        var f = (1 - d / 200) * 0.5;
        n.vx -= (dx / d) * f * 0.08;
        n.vy -= (dy / d) * f * 0.08;
      }
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,197,24,' + n.opacity + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  init(); draw();
  window.addEventListener('resize', init, { passive: true });

  /* Mouse interaction — viewport coords (canvas is fixed) */
  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', function() {
    mouse.x = -9999;
    mouse.y = -9999;
  });
})();
