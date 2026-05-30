import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/images/coffee-1.jpg';
import img2 from '../assets/images/coffee-2.webp';
import img3 from '../assets/images/coffee-3.webp';
import img4 from '../assets/images/coffee-4.webp';
import img5 from '../assets/images/coffee-5.webp';

gsap.registerPlugin(ScrollTrigger);

export default function CoffeeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0400);
    scene.fog = new THREE.FogExp2(0x0c0400, 0.032);

    // ── Camera ────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    // GSAP animates these proxy values; the loop lerps the real camera toward them
    const camTarget = { x: 0, y: 0, z: 7 };
    const mouseOffset = { x: 0, y: 0 };

    // ── Textures ──────────────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const loadTex = (src) => {
      const t = loader.load(src);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };

    // ── Layered image planes (3-D depth illusion) ─────────────────────────
    // Each layer sits at a different Z depth; mouse + scroll parallax
    // makes closer layers move faster, creating depth without actual 3D geo.
    const layerDefs = [
      { src: img5, x:  0.0,  y:  0.0,  z: -5.0, w: 14,  h:  8.5, o: 0.50 },
      { src: img3, x: -2.0,  y:  0.5,  z: -3.0, w:  7,  h:  4.8, o: 0.70 },
      { src: img4, x:  1.6,  y: -0.3,  z: -1.5, w:  5.5, h: 3.8, o: 0.72 },
      { src: img1, x:  0.0,  y:  0.0,  z:  0.0, w:  5,  h:  3.4, o: 1.00 },
      { src: img2, x: -0.7,  y:  0.3,  z:  1.8, w:  3.2, h: 2.2, o: 0.42 },
    ];

    const layers = layerDefs.map(({ src, x, y, z, w, h, o }) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({
          map: loadTex(src),
          transparent: true,
          opacity: o,
          depthWrite: false,
          roughness: 1,
          metalness: 0,
        })
      );
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return { mesh, targetX: x, targetY: y, baseX: x, baseY: y };
    });

    // ── Lights ────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x3d1200, 0.55);
    scene.add(ambient);

    const warm1 = new THREE.PointLight(0xff8844, 4.5, 22);
    warm1.position.set(2.5, 2.0, 4.5);
    scene.add(warm1);

    const warm2 = new THREE.PointLight(0xffcc55, 2.5, 16);
    warm2.position.set(-3.0, -1.5, 3.0);
    scene.add(warm2);

    const rim = new THREE.PointLight(0xfff0d0, 0.9, 30);
    rim.position.set(0, 5, -4);
    scene.add(rim);

    // Color proxy — GSAP tweens these; the loop calls setRGB each frame
    const warm1Color = { r: 1.0, g: 0.533, b: 0.267 };

    // ── Particle system (floating steam / ambient dust) ───────────────────
    const PARTICLE_COUNT = 500;
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xffaa66,
      size: 0.022,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })));

    // ── GSAP ScrollTrigger — camera path & light animation ───────────────
    const triggers = [];

    const mkTL = (triggerEl, start, end) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start,
          end,
          scrub: 1.5,
        },
      });
      triggers.push(tl.scrollTrigger);
      return tl;
    };

    // Hero → gentle zoom-in, warm light blooms
    mkTL('.cff-hero', 'top top', 'bottom top')
      .to(camTarget,  { z: 4.8, y: 0.2, ease: 'none' }, 0)
      .to(ambient,    { intensity: 1.0,  ease: 'none' }, 0)
      .to(warm1,      { intensity: 7,    ease: 'none' }, 0);

    // Origins → shift left, far layers fan out
    mkTL('.cff-origins', 'top 90%', 'bottom 10%')
      .to(camTarget,          { x: -1.1, y: 0.4, z: 5.5, ease: 'none' }, 0)
      .to(layers[1],          { targetX: -2.8,           ease: 'none' }, 0)
      .to(layers[2],          { targetX:  2.8,           ease: 'none' }, 0);

    // Process → shift right, temperature shifts to hot orange-red
    mkTL('.cff-process', 'top 90%', 'bottom 10%')
      .to(camTarget,   { x: 0.9, y: -0.3, z: 3.8, ease: 'none' }, 0)
      .to(warm1Color,  { r: 1.0, g: 0.27, b: 0.0, ease: 'none' }, 0)
      .to(warm1,       { intensity: 11,             ease: 'none' }, 0)
      .to(layers[1],   { targetX: -2.2,             ease: 'none' }, 0)
      .to(layers[2],   { targetX:  2.2,             ease: 'none' }, 0);

    // Experience → zoom in close, light settles warm golden
    mkTL('.cff-experience', 'top 90%', 'bottom 10%')
      .to(camTarget,  { x: 0, y: 0, z: 2.2, ease: 'none' }, 0)
      .to(warm1Color, { r: 1.0, g: 0.55, b: 0.25, ease: 'none' }, 0)
      .to(warm1,      { intensity: 5.5,             ease: 'none' }, 0)
      .to(ambient,    { intensity: 1.9,             ease: 'none' }, 0);

    // ── Mouse parallax ────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouseOffset.x = (e.clientX / window.innerWidth  - 0.5) *  0.45;
      mouseOffset.y = (e.clientY / window.innerHeight - 0.5) * -0.28;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Render loop ───────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Apply animated light color each frame
      warm1.color.setRGB(warm1Color.r, warm1Color.g, warm1Color.b);

      // Lights breathe in slow ellipses (shadows + highlights shift naturally)
      warm1.position.x = 2.5  + Math.sin(t * 0.42) * 0.9;
      warm1.position.y = 2.0  + Math.cos(t * 0.31) * 0.7;
      warm2.position.x = -3.0 + Math.cos(t * 0.37) * 0.8;
      warm2.position.y = -1.5 + Math.sin(t * 0.52) * 0.6;

      // Float particles upward like rising steam
      const pos = pGeo.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos.array[i * 3 + 1] += 0.0028;
        pos.array[i * 3]     += Math.sin(t * 0.38 + i * 0.13) * 0.0007;
        if (pos.array[i * 3 + 1] > 4.8) pos.array[i * 3 + 1] = -4.8;
      }
      pos.needsUpdate = true;

      // Lerp camera toward GSAP target + mouse offset (double-butter smoothness)
      camera.position.x += (camTarget.x + mouseOffset.x - camera.position.x) * 0.055;
      camera.position.y += (camTarget.y + mouseOffset.y - camera.position.y) * 0.055;
      camera.position.z += (camTarget.z              - camera.position.z) * 0.055;

      // Parallax each layer: depth index controls how much it moves
      layers.forEach(({ mesh, targetX, targetY, baseX, baseY }, i) => {
        const depth = (i - 2) * 0.28;
        const tx = targetX + mouseOffset.x * depth;
        const ty = targetY - mouseOffset.y * depth;
        mesh.position.x += (tx - mesh.position.x) * 0.048;
        mesh.position.y += (ty - mesh.position.y) * 0.048;
        // Micro-float for organic feel
        mesh.position.y += Math.sin(t * 0.13 + i * 1.3) * 0.0007;
      });

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      triggers.forEach((t) => t && t.kill());
      renderer.dispose();
      scene.traverse((obj) => {
        if (!obj.isMesh) return;
        obj.geometry.dispose();
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="cff-canvas" />;
}
