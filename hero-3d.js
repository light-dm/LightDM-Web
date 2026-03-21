(function () {
  'use strict';

  function startHero3D() {
    var THREE = window.THREE;
    if (!THREE) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    var heroSection = document.querySelector('section');
    if (!heroSection) return;

    // Hide original logo image — replaced by 3D canvas
    var logoImg = heroSection.querySelector('img[alt="LIGHT DM"]');
    if (logoImg) {
      logoImg.style.transition = 'opacity 0.6s';
      logoImg.style.opacity = '0';
    }
    // Also fade the glow div behind logo
    var glowDiv = heroSection.querySelector('[class*="bg-gradient-to-br"][class*="blur-"]');
    if (glowDiv) glowDiv.style.opacity = '0';

    // Canvas — full-section, behind text (z-index 1 via CSS)
    var canvas = document.createElement('canvas');
    canvas.id = 'ldm-hero-canvas';
    heroSection.appendChild(canvas);

    var w = heroSection.offsetWidth;
    var h = heroSection.offsetHeight || heroSection.getBoundingClientRect().height || window.innerHeight;

    // Renderer
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 4.2;

    // Offset X so geometry sits on the right side of the viewport
    var offsetX = w > 1200 ? 2.0 : 1.6;

    // ── Inner wireframe icosahedron ─────────────────
    var geoInner = new THREE.IcosahedronGeometry(1.3, 1);
    var matInner = new THREE.MeshBasicMaterial({
      color: 0xF5C518,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    var meshInner = new THREE.Mesh(geoInner, matInner);
    meshInner.position.x = offsetX;
    scene.add(meshInner);

    // ── Outer wireframe (counter-rotate) ────────────
    var geoOuter = new THREE.IcosahedronGeometry(1.85, 1);
    var matOuter = new THREE.MeshBasicMaterial({
      color: 0xF5C518,
      wireframe: true,
      transparent: true,
      opacity: 0.07
    });
    var meshOuter = new THREE.Mesh(geoOuter, matOuter);
    meshOuter.position.x = offsetX;
    scene.add(meshOuter);

    // ── Point cloud on geodesic sphere ──────────────
    var geoPoints = new THREE.IcosahedronGeometry(1.0, 3);
    var positions = geoPoints.attributes.position.array;
    var pts = [];
    for (var i = 0; i < positions.length; i += 3) {
      pts.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
    }
    var ptBuf = new THREE.BufferGeometry().setFromPoints(pts);
    var ptMat = new THREE.PointsMaterial({
      color: 0xF5C518,
      size: 0.028,
      transparent: true,
      opacity: 0.55
    });
    var pointCloud = new THREE.Points(ptBuf, ptMat);
    pointCloud.position.x = offsetX;
    scene.add(pointCloud);

    // ── Animation ──────────────────────────────────
    var t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.0035;
      meshInner.rotation.x = t * 0.42;
      meshInner.rotation.y = t;
      meshOuter.rotation.x = -t * 0.22;
      meshOuter.rotation.y = t * 0.65;
      pointCloud.rotation.x = t * 0.28;
      pointCloud.rotation.y = -t * 0.48;
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ─────────────────────────────────────
    window.addEventListener('resize', function () {
      w = heroSection.offsetWidth;
      h = heroSection.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  function tryStart() {
    if (document.getElementById('ldm-hero-canvas')) return;
    if (window.THREE) {
      try { startHero3D(); } catch(e) { console.error('[hero-3d] startHero3D error:', e.message); }
      return;
    }
    // Load Three.js dynamically then start
    var s = document.createElement('script');
    s.src = '/three.min.js';
    s.onload = function() {
      try { startHero3D(); } catch(e) { console.error('[hero-3d] startHero3D after load error:', e.message); }
    };
    s.onerror = function() { console.error('[hero-3d] three.min.js failed to load'); };
    document.head.appendChild(s);
  }

  // After React hydration completes (same pattern as cursor)
  window.addEventListener('load', tryStart);

  // Fallback: defer scripts sometimes run after load event in preview/cached pages
  if (document.readyState === 'complete') {
    setTimeout(tryStart, 100);
  }
})();
