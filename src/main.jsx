import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './styles.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';

const projects = [
  { n: '01', name: 'ROYAL TOUCH', type: 'Mobile car wash website.', tags: 'Brand identity · Service presentation · Conversion' },
  { n: '02', name: 'FOG', type: 'Immersive portfolio environment.', tags: 'WebGL · Atmosphere · Interaction' },
  { n: '03', name: 'B1O', type: 'Experimental digital interface.', tags: 'UI · Motion · Software' },
];

const services = [
  ['01', 'CUSTOM WEBSITES', 'Purpose-built digital spaces shaped around the business, not a template.'],
  ['02', 'LANDING PAGES', 'Focused pages with strong hierarchy, clear messaging and intentional motion.'],
  ['03', 'WEBSITE REDESIGN', 'A sharper visual system and a better experience without losing what works.'],
  ['04', 'RESPONSIVE UI', 'Layouts that feel designed at every size, from a wide desktop to a small phone.'],
  ['05', 'UI / VISUAL DESIGN', 'Type, spacing, composition and interaction tuned into one coherent language.'],
  ['06', 'PERFORMANCE', 'Fast, lightweight builds that keep the visual ambition without the unnecessary weight.'],
];

const process = [
  ['01', 'OBSERVE', 'Understand the business, audience, offer and what the current experience is missing.'],
  ['02', 'SHAPE', 'Reduce the noise, build the structure and establish a visual direction with purpose.'],
  ['03', 'BUILD', 'Turn the direction into a responsive interface with careful interaction and motion.'],
  ['04', 'REFINE', 'Polish every edge, test the experience and make the final result feel effortless.'],
];

const toolkit = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Framer Motion', 'Vite', 'Git', 'Linux', 'UI Design'];

const seed = (value) => {
  const x = Math.sin(value * 127.17) * 43758.5453123;
  return x - Math.floor(x);
};

const createBarkTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const grain = Math.sin(x * 0.11) * 18 + Math.sin(x * 0.031 + y * 0.017) * 12 + Math.sin(y * 0.013) * 9;
      const knots = Math.sin((x + y * 0.4) * 0.025) * 16;
      const value = Math.max(8, Math.min(245, 96 + grain + knots));
      const i = (y * canvas.width + x) * 4;
      image.data[i] = value;
      image.data[i + 1] = value;
      image.data[i + 2] = value;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  return texture;
};

const createMistTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255,255,255,.2)');
  gradient.addColorStop(0.45, 'rgba(255,255,255,.06)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
};

const createBlossomGeometry = () => {
  const vertices = [];
  const indices = [];
  const petalCount = 5;
  const pointsPerPetal = 5;
  for (let p = 0; p < petalCount; p += 1) {
    const angle = (p / petalCount) * Math.PI * 2;
    const cx = Math.cos(angle) * 0.055;
    const cy = Math.sin(angle) * 0.055;
    const start = p * pointsPerPetal;
    vertices.push(0, 0, 0);
    vertices.push(cx * 0.5, cy * 0.5, 0.012);
    vertices.push(cx * 1.65 - Math.sin(angle) * 0.025, cy * 1.65 + Math.cos(angle) * 0.025, 0);
    vertices.push(cx * 2.15, cy * 2.15, -0.008);
    vertices.push(cx * 1.65 + Math.sin(angle) * 0.025, cy * 1.65 - Math.cos(angle) * 0.025, 0);
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3, start, start + 3, start + 4);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};

const createBranch = (points, radius, material, target) => {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, Math.max(10, points.length * 5), radius, 7, false);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  target.add(mesh);
  return { mesh, curve };
};

function SakuraBonsai({ progress }) {
  const mount = useRef(null);
  const targetProgress = useRef(0);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    targetProgress.current = progress;
  }, [progress]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;

    let renderer;
    let frameId;
    let cleanup;

    try {
      const mobile = window.innerWidth < 760;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x060608);
      scene.fog = new THREE.FogExp2(0x0a0a0c, mobile ? 0.012 : 0.008);

      const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
      camera.position.set(mobile ? 0.4 : 6.4, 2.75, mobile ? 14.8 : 12.8);

      renderer = new THREE.WebGLRenderer({ antialias: !mobile && !reduced, alpha: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.45));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.shadowMap.enabled = !mobile;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.className = 'forest-webgl';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);

      const ambient = new THREE.HemisphereLight(0xf1f3f4, 0x101014, 1.18);
      scene.add(ambient);

      const key = new THREE.DirectionalLight(0xf8f8f8, 3.4);
      key.position.set(-8, 13, 9);
      key.castShadow = !mobile;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 40;
      key.shadow.camera.left = -13;
      key.shadow.camera.right = 13;
      key.shadow.camera.top = 15;
      key.shadow.camera.bottom = -7;
      scene.add(key);

      const rim = new THREE.PointLight(0xe1a4b7, 7, 34, 2.2);
      rim.position.set(-6, 7, -5);
      scene.add(rim);

      const coolFill = new THREE.PointLight(0xb8c2ca, 4.2, 30, 2);
      coolFill.position.set(7, 4, 4);
      scene.add(coolFill);

      const bonsai = new THREE.Group();
      bonsai.position.set(mobile ? 0 : 2.25, -0.32, -1.4);
      scene.add(bonsai);

      const barkTexture = createBarkTexture();
      barkTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const barkMaterial = new THREE.MeshStandardMaterial({
        color: 0x1c1b1d,
        map: barkTexture,
        bumpMap: barkTexture,
        bumpScale: 0.07,
        roughness: 0.89,
        metalness: 0.01,
      });

      const trunkBranches = [];
      const mainTrunk = createBranch([
        new THREE.Vector3(0, 0.15, 0),
        new THREE.Vector3(-0.18, 1.3, 0.04),
        new THREE.Vector3(0.28, 2.55, -0.12),
        new THREE.Vector3(0.05, 3.7, -0.25),
        new THREE.Vector3(0.44, 4.8, -0.18),
        new THREE.Vector3(0.2, 5.7, -0.38),
      ], 0.53, barkMaterial, bonsai);
      trunkBranches.push(mainTrunk);

      const branchSpecs = [
        { p: [[-0.05,1.35,0.02],[-1.0,1.85,0.03],[-2.2,2.12,-0.03],[-3.55,2.0,-0.2],[-4.5,2.35,-0.18]], r: 0.24 },
        { p: [[0.08,1.95,-0.04],[0.9,2.35,-0.12],[1.75,2.8,-0.2],[3.0,2.65,-0.42],[4.0,3.2,-0.28]], r: 0.22 },
        { p: [[0.18,2.55,-0.1],[-0.35,3.05,-0.1],[-1.35,3.55,-0.12],[-2.25,3.55,-0.4],[-3.15,4.15,-0.25]], r: 0.19 },
        { p: [[0.18,3.12,-0.16],[0.88,3.65,-0.2],[1.8,3.9,-0.4],[2.85,4.5,-0.24]], r: 0.17 },
        { p: [[0.26,3.7,-0.23],[-0.3,4.25,-0.3],[-1.15,4.55,-0.38],[-2.0,5.2,-0.22]], r: 0.16 },
        { p: [[0.38,4.2,-0.2],[1.1,4.8,-0.35],[2.15,5.1,-0.3],[3.0,5.65,-0.1]], r: 0.15 },
        { p: [[0.3,4.7,-0.22],[-0.25,5.25,-0.3],[-1.0,5.75,-0.2],[-1.45,6.4,-0.05]], r: 0.13 },
        { p: [[0.3,5.2,-0.28],[0.85,5.75,-0.3],[1.45,6.35,-0.18],[2.0,6.9,-0.08]], r: 0.12 },
      ];

      branchSpecs.forEach((spec, index) => {
        const branch = createBranch(spec.p.map(([x, y, z]) => new THREE.Vector3(x, y, z)), spec.r, barkMaterial, bonsai);
        trunkBranches.push(branch);

        const end = spec.p[spec.p.length - 1];
        const twigDirection = index % 2 === 0 ? -1 : 1;
        for (let t = 0; t < 4; t += 1) {
          const start = new THREE.Vector3(end[0] + (t - 1.5) * 0.22, end[1] + t * 0.08, end[2]);
          const finish = new THREE.Vector3(
            start.x + twigDirection * (0.5 + seed(index * 9 + t) * 0.7),
            start.y + 0.35 + seed(index * 5 + t) * 0.45,
            start.z + (seed(index * 17 + t) - 0.5) * 0.55,
          );
          const twig = createBranch([start, finish], Math.max(0.045, spec.r * 0.27), barkMaterial, bonsai);
          trunkBranches.push(twig);
        }
      });

      const potMaterial = new THREE.MeshPhysicalMaterial({ color: 0x131317, roughness: 0.36, metalness: 0.18, clearcoat: 0.18, clearcoatRoughness: 0.28 });
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.08, 1.42, 64, 1, true), potMaterial);
      pot.position.y = -0.58;
      pot.castShadow = !mobile;
      pot.receiveShadow = !mobile;
      bonsai.add(pot);

      const potRim = new THREE.Mesh(new THREE.TorusGeometry(2.38, 0.1, 16, 64), potMaterial);
      potRim.rotation.x = Math.PI / 2;
      potRim.position.y = 0.14;
      potRim.scale.z = 0.8;
      bonsai.add(potRim);

      const soil = new THREE.Mesh(new THREE.CircleGeometry(2.27, 64), new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 1 }));
      soil.rotation.x = -Math.PI / 2;
      soil.position.y = 0.12;
      soil.scale.set(1, 0.82, 1);
      bonsai.add(soil);

      const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x34353a, roughness: 1 });
      for (let i = 0; i < 7; i += 1) {
        const stone = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13 + seed(i * 7) * 0.16, 1), stoneMaterial);
        stone.position.set((seed(i * 2.1) - 0.5) * 3.5, 0.16, (seed(i * 3.3) - 0.5) * 1.8);
        stone.rotation.set(seed(i) * 2, seed(i * 4) * 2, seed(i * 5) * 2);
        stone.scale.y = 0.55;
        bonsai.add(stone);
      }

      const blossomGeometry = createBlossomGeometry();
      const blossomMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xe8a6b9,
        emissive: 0x2f0d1a,
        emissiveIntensity: 0.45,
        roughness: 0.5,
        clearcoat: 0.32,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide,
      });
      const blossomCount = mobile ? 260 : 520;
      const blossoms = new THREE.InstancedMesh(blossomGeometry, blossomMaterial, blossomCount);
      blossoms.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      bonsai.add(blossoms);

      const blossomDummy = new THREE.Object3D();
      let blossomIndex = 0;
      const blossomPoints = [];
      trunkBranches.slice(1).forEach((branch, branchIndex) => {
        const samples = mobile ? 4 : 6;
        for (let s = 0; s < samples; s += 1) {
          const t = (s + 0.55) / (samples + 0.1);
          const point = branch.curve.getPointAt(Math.min(0.96, t));
          const clusterSeed = branchIndex * 100 + s;
          blossomPoints.push({ point, seed: clusterSeed });
        }
      });

      blossomPoints.forEach(({ point, seed: pointSeed }) => {
        const clusterSize = 4 + Math.floor(seed(pointSeed) * 3);
        for (let c = 0; c < clusterSize && blossomIndex < blossomCount; c += 1) {
          const angle = seed(pointSeed * 2 + c) * Math.PI * 2;
          const radius = 0.08 + seed(pointSeed * 5 + c) * 0.22;
          blossomDummy.position.set(
            point.x + Math.cos(angle) * radius,
            point.y + (seed(pointSeed * 7 + c) - 0.35) * 0.28,
            point.z + Math.sin(angle) * radius,
          );
          blossomDummy.rotation.set(
            seed(pointSeed * 3 + c) * Math.PI,
            angle,
            seed(pointSeed * 8 + c) * Math.PI,
          );
          const scale = 0.55 + seed(pointSeed * 9 + c) * 0.55;
          blossomDummy.scale.set(scale, scale * (0.78 + seed(pointSeed + c) * 0.3), scale);
          blossomDummy.updateMatrix();
          blossoms.setMatrixAt(blossomIndex, blossomDummy.matrix);
          blossomIndex += 1;
        }
      });
      blossoms.instanceMatrix.needsUpdate = true;

      const centerBloom = new THREE.PointLight(0xffa9bf, 2.8, 14, 2.5);
      centerBloom.position.set(0, 6.1, 1.8);
      bonsai.add(centerBloom);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(70, 70),
        new THREE.MeshStandardMaterial({ color: 0x050507, roughness: 0.97, metalness: 0.04 }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2.02;
      ground.position.z = -3;
      ground.receiveShadow = !mobile;
      scene.add(ground);

      const mistTexture = createMistTexture();
      const mistMaterial = new THREE.SpriteMaterial({ map: mistTexture, color: 0xdde1e4, transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending });
      const mist = new THREE.Sprite(mistMaterial);
      mist.scale.set(17, 7, 1);
      mist.position.set(0, 0.35, -2);
      scene.add(mist);

      const petalCount = mobile ? 80 : 160;
      const petalPositions = new Float32Array(petalCount * 3);
      const petalVelocities = new Float32Array(petalCount * 3);
      for (let i = 0; i < petalCount; i += 1) {
        petalPositions[i * 3] = (seed(i * 4.1) * 2 - 1) * 8.5;
        petalPositions[i * 3 + 1] = 1 + seed(i * 5.4) * 8;
        petalPositions[i * 3 + 2] = -2 + (seed(i * 6.6) * 2 - 1) * 4.5;
        petalVelocities[i * 3] = (seed(i * 3.2) - 0.5) * 0.0018;
        petalVelocities[i * 3 + 1] = -0.002 - seed(i * 8.1) * 0.002;
        petalVelocities[i * 3 + 2] = (seed(i * 9.2) - 0.5) * 0.0016;
      }
      const driftingPetals = new THREE.BufferGeometry();
      const positionAttribute = new THREE.BufferAttribute(petalPositions, 3);
      positionAttribute.setUsage(THREE.DynamicDrawUsage);
      driftingPetals.setAttribute('position', positionAttribute);
      const driftingMaterial = new THREE.PointsMaterial({ color: 0xe5aabc, size: mobile ? 0.055 : 0.07, transparent: true, opacity: 0.58, depthWrite: false });
      const drifting = new THREE.Points(driftingPetals, driftingMaterial);
      scene.add(drifting);

      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.45));
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      const clock = new THREE.Clock();
      const animate = () => {
        const elapsed = clock.getElapsedTime();
        const p = THREE.MathUtils.clamp(targetProgress.current, 0, 1);
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);

        const cameraZ = (mobile ? 14.6 : 13.0) - eased * (mobile ? 4.4 : 6.8);
        const cameraX = mobile ? Math.sin(elapsed * 0.045) * 0.25 : 6.4 - eased * 2.5 + Math.sin(elapsed * 0.04) * 0.18;
        const cameraY = (mobile ? 2.8 : 2.72) + eased * 0.35 + Math.sin(elapsed * 0.08) * 0.025;
        camera.position.x += (cameraX - camera.position.x) * 0.04;
        camera.position.y += (cameraY - camera.position.y) * 0.04;
        camera.position.z += (cameraZ - camera.position.z) * 0.045;

        const lookAt = new THREE.Vector3(mobile ? 0 : 0.9 + eased * 0.5, 3.05 + eased * 0.2, 0);
        camera.lookAt(lookAt);

        bonsai.rotation.y = (mobile ? -0.03 : -0.2) + Math.sin(elapsed * 0.035) * 0.025 + eased * 0.28;
        bonsai.rotation.x = Math.sin(elapsed * 0.03) * 0.008;

        key.intensity = 2.8 + eased * 0.8;
        rim.intensity = 5.2 + Math.sin(elapsed * 0.4) * 0.5 + eased * 1.2;
        centerBloom.intensity = 2.4 + Math.sin(elapsed * 0.22) * 0.25;
        mistMaterial.opacity = 0.05 + (1 - eased) * 0.055;
        scene.fog.density = (mobile ? 0.013 : 0.009) + eased * 0.003;

        const positions = drifting.geometry.attributes.position.array;
        for (let i = 0; i < petalCount; i += 1) {
          positions[i * 3] += petalVelocities[i * 3] + Math.sin(elapsed * 0.4 + i) * 0.0005;
          positions[i * 3 + 1] += petalVelocities[i * 3 + 1];
          positions[i * 3 + 2] += petalVelocities[i * 3 + 2];
          if (positions[i * 3 + 1] < 0.15) positions[i * 3 + 1] = 8.5;
          if (Math.abs(positions[i * 3]) > 9) positions[i * 3] *= -0.72;
        }
        drifting.geometry.attributes.position.needsUpdate = true;
        drifting.rotation.y = Math.sin(elapsed * 0.05) * 0.05;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        barkTexture.dispose();
        mistTexture.dispose();
        blossomGeometry.dispose();
        blossomMaterial.dispose();
        barkMaterial.dispose();
        potMaterial.dispose();
        stoneMaterial.dispose();
        ground.geometry.dispose();
        ground.material.dispose();
        driftingPetals.dispose();
        driftingMaterial.dispose();
        trunkBranches.forEach(({ mesh }) => mesh.geometry.dispose());
        if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      };
    } catch (error) {
      console.error('Sakura scene failed to initialize:', error);
      setFallback(true);
    }

    return () => cleanup?.();
  }, []);

  return <div ref={mount} className={`bonsai-runtime ${fallback ? 'bonsai-fallback' : ''}`} aria-hidden="true">{fallback && <div className="fallback-mark">SAKURA / FALLBACK</div>}</div>;
}

function GlassPanel({ children, className = '' }) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}

function App() {
  const [scroll, setScroll] = useState(0);
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight * 2.75 : 1800;
  const progress = Math.min(scroll / Math.max(1, heroHeight), 1);
  const heroOpacity = Math.max(0, 1 - progress * 1.42);
  const bonsaiFade = Math.max(0.25, 1 - progress * 0.48);
  const navGlass = progress > 0.62;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScroll(window.scrollY);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">
      <section className="bonsai-section" id="top">
        <SakuraBonsai progress={progress} />
        <div className="grain" />
        <div className="cinema-lines" />
        <div className="bloom-haze" style={{ opacity: bonsaiFade }} />

        <header className={`nav ${navGlass ? 'nav-glass' : ''}`}>
          <a className="brand" href="#top"><span className="brand-dot" />ERIK <em>/ WEB</em></a>
          <nav>
            <a href="#about">ABOUT</a>
            <a href="#work">WORK</a>
            <a href="#services">SERVICES</a>
            <a href="#contact">CONTACT</a>
            <a href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a>
          </nav>
        </header>

        <div className="hero" style={{ opacity: heroOpacity, transform: `translateY(${-progress * 50}px)` }}>
          <p className="eyebrow"><span /> WEB DEVELOPER · UNITED STATES</p>
          <h1>Built with<br /><em>patience.</em></h1>
          <p className="hero-copy">Digital experiences shaped with restraint, clarity and attention to the details people remember.</p>
          <div className="hero-actions">
            <a href="#about" className="primary-glass">EXPLORE <span>↓</span></a>
            <a href="#contact">START A PROJECT <span>↗</span></a>
          </div>
        </div>

        <div className="hero-side-note">SAKURA / 001<br /><span>A QUIET INTERFACE</span></div>
        <div className="hero-status glass-panel mini-panel">
          <div><small>FOCUS</small><strong>WEB / UI</strong></div>
          <div><small>STATUS</small><strong>AVAILABLE</strong></div>
          <div><small>APPROACH</small><strong>DESIGN · BUILD · POLISH</strong></div>
        </div>
        <div className="scroll-mark">SCROLL TO SHAPE <span>↓</span></div>
      </section>

      <main>
        <section className="section about" id="about">
          <div className="section-top"><span>01 / ABOUT</span><a href={FIVERR_URL} target="_blank" rel="noreferrer">START ON FIVERR ↗</a></div>
          <div className="about-layout">
            <div className="manifesto">
              <p className="section-kicker">LESS NOISE. BETTER FORM.</p>
              <h2>I build digital spaces <em>with intention.</em></h2>
              <p className="lead">Hi, I’m Erik. I’m a web developer based in the United States. I care about the quiet details — type, spacing, motion, speed and the small decisions that make a website feel considered instead of assembled.</p>
            </div>
            <GlassPanel className="about-card">
              <div className="card-corner">01</div>
              <p>THE PRINCIPLE</p>
              <h3>Remove what does not belong. Shape what matters.</h3>
              <span>Like a bonsai, the final form comes from patience, restraint and hundreds of small decisions.</span>
            </GlassPanel>
          </div>
          <div className="metric-row">
            <div><span>01</span><strong>WEB / UI</strong><small>FOCUS</small></div>
            <div><span>02</span><strong>AVAILABLE</strong><small>STATUS</small></div>
            <div><span>03</span><strong>DESIGN · BUILD · POLISH</strong><small>APPROACH</small></div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-top"><span>02 / SELECTED WORK</span><span>THREE DIRECTIONS</span></div>
          <div className="work-intro">
            <h2>Different briefs.<br /><em>Same discipline.</em></h2>
            <p>Identity, interface and interaction are treated as one surface — not separate layers.</p>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <article className={`project-card ${index === 0 ? 'project-large' : ''}`} key={project.name}>
                <div className={`project-art art-${index + 1}`}>
                  <div className="art-no">{project.n}</div>
                  <div className="art-grid" />
                  <div className="art-title">{project.name}</div>
                  <div className="art-accent" />
                </div>
                <div className="project-info">
                  <span>{project.n}</span>
                  <div><h3>{project.name}</h3><p>{project.type}</p><small>{project.tags}</small></div>
                  <b>↗</b>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-top"><span>03 / SERVICES</span><span>WHAT I BUILD</span></div>
          <div className="services-intro"><h2>Quiet surface.<br /><em>Strong structure.</em></h2></div>
          <div className="service-list">
            {services.map(([n, title, desc]) => (
              <div className="service" key={n}><span className="service-no">{n}</span><h3>{title}</h3><p>{desc}</p><i>↗</i></div>
            ))}
          </div>
        </section>

        <section className="section process">
          <div className="section-top"><span>04 / PROCESS</span><span>FROM IDEA TO LAUNCH</span></div>
          <div className="process-intro"><p>GOOD DIGITAL WORK IS MOSTLY DECISION MAKING.</p><h2>Observe.<br />Shape.<br /><em>Refine.</em></h2></div>
          <div className="process-grid">
            {process.map(([n, title, desc]) => <GlassPanel className="process-card" key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p><b>+</b></GlassPanel>)}
          </div>
        </section>

        <section className="section toolkit">
          <div className="section-top"><span>05 / TOOLKIT</span><span>THE MATERIALS</span></div>
          <div className="toolkit-head"><h2>Tools stay quiet.<br /><em>The result speaks.</em></h2><p>Modern front-end tools, used selectively — enough technology to create the experience, never enough to distract from it.</p></div>
          <div className="tools">{toolkit.map((tool, index) => <div key={tool}><span>{String(index + 1).padStart(2, '0')}</span><strong>{tool}</strong></div>)}</div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-bloom" />
          <div className="section-top"><span>06 / CONTACT</span><span>OPEN FOR SELECTED PROJECTS</span></div>
          <div className="contact-inner">
            <p>HAVE SOMETHING WORTH SHAPING?</p>
            <h2>Let’s make<br /><em>it clear.</em></h2>
            <div className="contact-links">
              <a href={FIVERR_URL} target="_blank" rel="noreferrer" className="contact-primary"><span>START A PROJECT</span><b>↗</b></a>
              <a href={FIVERR_URL} target="_blank" rel="noreferrer"><span>FIVERR</span><b>↗</b></a>
            </div>
          </div>
          <div className="contact-mark">S / 01<br /><span>BUILD WITH PATIENCE</span></div>
        </section>
      </main>

      <footer><span>ERIK / WEB</span><span>BLACK · WHITE · GREY · SAKURA</span><span>© 2026</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
