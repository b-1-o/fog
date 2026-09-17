import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import './styles.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';

const projects = [
  { n: '01', name: 'ROYAL TOUCH', type: 'Mobile car wash website.', tags: 'Brand identity · Service presentation · Conversion', className: 'project-wash' },
  { n: '02', name: 'FOREST', type: 'Experimental immersive portfolio.', tags: 'WebGL · Atmosphere · Interaction', className: 'project-forest' },
  { n: '03', name: 'B1O', type: 'Experimental digital interface.', tags: 'UI · Motion · Software', className: 'project-bio' },
];

const services = [
  ['01', 'CUSTOM WEBSITES', 'Purpose-built websites designed around a business instead of a template.'],
  ['02', 'LANDING PAGES', 'Focused pages designed to communicate quickly and guide visitors toward action.'],
  ['03', 'WEBSITE REDESIGN', 'Modernize an outdated website while preserving what already works.'],
  ['04', 'RESPONSIVE UI', 'Interfaces that feel intentional across desktop, tablet and mobile.'],
  ['05', 'UI / VISUAL DESIGN', 'Typography, spacing, hierarchy, composition and visual systems.'],
  ['06', 'PERFORMANCE', 'Fast-loading, lightweight experiences with attention to technical quality.'],
];

const process = [
  ['01', 'DISCOVER', 'Understand the business, audience, goals and problems.'],
  ['02', 'SHAPE', 'Turn the information into a clear structure and visual direction.'],
  ['03', 'BUILD', 'Develop the experience with responsive layouts and modern technologies.'],
  ['04', 'LAUNCH', 'Polish, test and prepare the website for real visitors.'],
];

const toolkit = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Framer Motion', 'Vite', 'Git', 'Linux', 'UI Design'];

const seed = (value) => {
  const x = Math.sin(value * 127.17) * 43758.5453123;
  return x - Math.floor(x);
};

function Forest({ progress }) {
  const mount = useRef(null);
  const state = useRef({ progress: 0, reduced: false });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;

    state.current.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    let animationFrame;
    let cleanup;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x07100c);
      scene.fog = new THREE.FogExp2(0x6f8076, 0.018);

      const camera = new THREE.PerspectiveCamera(53, 1, 0.1, 260);
      camera.position.set(0, 1.6, 20);

      renderer = new THREE.WebGLRenderer({
        antialias: !state.current.reduced,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.className = 'forest-webgl';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);

      const hemi = new THREE.HemisphereLight(0xb6c8bd, 0x101913, 1.55);
      scene.add(hemi);

      const key = new THREE.DirectionalLight(0xe2ece5, 2.0);
      key.position.set(-18, 22, 5);
      scene.add(key);

      const clearing = new THREE.PointLight(0xc6d8cc, 4.5, 70, 2);
      clearing.position.set(0, 8, -42);
      scene.add(clearing);

      const forest = new THREE.Group();
      scene.add(forest);

      const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.32, 1, 7, 1, false);
      const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x16231c, roughness: 0.95, metalness: 0.02 });
      const trunks = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, 150);
      trunks.instanceMatrix.setUsage(THREE.StaticDrawUsage);
      forest.add(trunks);

      const canopyGeometry = new THREE.ConeGeometry(1, 1, 7, 1, false);
      const canopyMaterial = new THREE.MeshStandardMaterial({ color: 0x172a20, roughness: 0.98, metalness: 0.0, flatShading: true });
      const canopyLayers = [
        new THREE.InstancedMesh(canopyGeometry, canopyMaterial, 150),
        new THREE.InstancedMesh(canopyGeometry, canopyMaterial, 150),
        new THREE.InstancedMesh(canopyGeometry, canopyMaterial, 150),
        new THREE.InstancedMesh(canopyGeometry, canopyMaterial, 150),
      ];
      canopyLayers.forEach((mesh) => { mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage); forest.add(mesh); });

      const dummy = new THREE.Object3D();
      for (let i = 0; i < 150; i += 1) {
        const z = 17 - seed(i * 1.91) * 128;
        const depth = THREE.MathUtils.clamp((z + 110) / 127, 0, 1);
        const spread = 10 + depth * 23;
        const x = (seed(i * 3.77) * 2 - 1) * spread;
        const baseY = seed(i * 4.15) * 0.15;
        const height = 5 + seed(i * 7.21) * 9 + (z > -8 ? 2.5 : 0);
        const trunkRadius = 0.11 + seed(i * 8.3) * 0.17;

        dummy.position.set(x, baseY + height * 0.5, z);
        dummy.rotation.set(0, seed(i * 9.4) * Math.PI, 0);
        dummy.scale.set(trunkRadius, height, trunkRadius * (0.86 + seed(i * 2.8) * 0.25));
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);

        for (let layer = 0; layer < 4; layer += 1) {
          const size = (1 - layer * 0.14) * (1.15 + seed(i * 1.4 + layer) * 0.9) * (height * 0.085);
          dummy.position.set(
            x + (seed(i * 3 + layer) - 0.5) * 0.35,
            baseY + height * (0.52 + layer * 0.105),
            z,
          );
          dummy.rotation.set(0, seed(i * 9.4 + layer) * Math.PI, 0);
          dummy.scale.set(size, height * (0.22 - layer * 0.022), size * (0.88 + depth * 0.1));
          dummy.updateMatrix();
          canopyLayers[layer].setMatrixAt(i, dummy.matrix);
        }
      }

      trunks.instanceMatrix.needsUpdate = true;
      canopyLayers.forEach((mesh) => { mesh.instanceMatrix.needsUpdate = true; });

      const floorGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
      const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x101913, roughness: 1, metalness: 0 });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.03;
      floor.position.z = -40;
      scene.add(floor);

      const pathGeometry = new THREE.PlaneGeometry(10, 160, 1, 1);
      const pathMaterial = new THREE.MeshBasicMaterial({ color: 0x35473d, transparent: true, opacity: 0.18 });
      const path = new THREE.Mesh(pathGeometry, pathMaterial);
      path.rotation.x = -Math.PI / 2;
      path.position.set(0, -0.01, -40);
      scene.add(path);

      const particleCount = window.innerWidth < 700 ? 420 : 900;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        particlePositions[i * 3] = (seed(i * 4.2) * 2 - 1) * 34;
        particlePositions[i * 3 + 1] = 0.5 + seed(i * 5.6) * 13;
        particlePositions[i * 3 + 2] = 14 - seed(i * 6.9) * 130;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: 0xdce8e0, size: 0.055, transparent: true, opacity: 0.34, depthWrite: false });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      const clock = new THREE.Clock();
      const animate = () => {
        const elapsed = clock.getElapsedTime();
        const targetProgress = state.current.progress;
        state.current.progress += (targetProgress - state.current.progress) * 0.035;
        const p = THREE.MathUtils.smoothstep(state.current.progress, 0, 1);

        const targetZ = 20 - p * 112;
        const targetX = Math.sin(elapsed * 0.055) * 0.7 + Math.sin(p * Math.PI) * 1.2;
        const targetY = 1.58 + Math.sin(elapsed * 0.12) * 0.035 + Math.sin(p * Math.PI) * 0.08;
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetY - camera.position.y) * 0.04;
        camera.position.z += (targetZ - camera.position.z) * 0.055;
        camera.rotation.x += ((-0.012 + Math.sin(p * Math.PI) * 0.004) - camera.rotation.x) * 0.03;
        camera.rotation.y += (Math.sin(elapsed * 0.035) * 0.004 - camera.rotation.y) * 0.03;

        forest.rotation.y = Math.sin(elapsed * 0.035) * 0.005;
        particles.rotation.y = elapsed * 0.012;
        particles.position.x = Math.sin(elapsed * 0.035) * 0.45;

        const fogBase = 0.022 - p * 0.008;
        const exitHaze = p > 0.74 ? (p - 0.74) * 0.021 : 0;
        scene.fog.density = fogBase + exitHaze;
        clearing.intensity = 2.6 + p * 3.5;
        key.intensity = 1.55 + (1 - p) * 0.55;
        particleMaterial.opacity = 0.22 + (1 - p) * 0.2;

        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        trunkGeometry.dispose();
        trunkMaterial.dispose();
        canopyGeometry.dispose();
        canopyMaterial.dispose();
        floorGeometry.dispose();
        floorMaterial.dispose();
        pathGeometry.dispose();
        pathMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      };
    } catch (error) {
      console.error('WebGL forest failed to initialize:', error);
      setFallback(true);
    }

    return () => cleanup?.();
  }, []);

  useEffect(() => {
    state.current.progress = progress;
  }, [progress]);

  return <div ref={mount} className={`forest-runtime ${fallback ? 'forest-fallback' : ''}`} aria-hidden="true">{fallback && <div className="forest-fallback-copy">ATMOSPHERE / FALLBACK</div>}</div>;
}

function App() {
  const [scroll, setScroll] = useState(0);
  const forestProgress = Math.min(scroll / Math.max(1, window.innerHeight * 2.5), 1);
  const heroOpacity = Math.max(0, 1 - forestProgress * 1.35);
  const navDark = forestProgress > 0.92;

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
      <section className="forest-section" id="top">
        <Forest progress={forestProgress} />
        <div className="forest-cinema" style={{ opacity: Math.max(0, (forestProgress - 0.68) * 2.9) }} />

        <header className={`nav ${navDark ? 'nav-dark' : ''}`}>
          <a className="brand" href="#top">ERIK <span>/ WEB</span></a>
          <nav>
            <a href="#about">ABOUT</a>
            <a href="#work">WORK</a>
            <a href="#services">SERVICES</a>
            <a href="#contact">CONTACT</a>
            <a href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a>
          </nav>
        </header>

        <div className="hero" style={{ opacity: heroOpacity, transform: `translateY(${-forestProgress * 35}px)` }}>
          <p className="eyebrow">WEB DEVELOPER · UNITED STATES</p>
          <h1>Into the quiet.<br /><em>Out with clarity.</em></h1>
          <p className="hero-copy">I design and build clean, responsive websites for small businesses and independent brands — focused on clarity, performance and turning attention into action.</p>
          <div className="hero-actions">
            <a href="#about">EXPLORE ↓</a>
            <a href="#contact">START A PROJECT ↗</a>
          </div>
        </div>

        <div className="status">
          <div><small>FOCUS</small><strong>WEB / UI</strong></div>
          <div><small>STATUS</small><strong>AVAILABLE</strong></div>
          <div><small>APPROACH</small><strong>DESIGN · BUILD · POLISH</strong></div>
        </div>
        <div className="scroll-mark">SCROLL TO TRAVEL <span>↓</span></div>
      </section>

      <main>
        <section className="section about" id="about">
          <div className="section-top"><span>01 / ABOUT</span><a href={FIVERR_URL} target="_blank" rel="noreferrer">START ON FIVERR ↗</a></div>
          <div className="split">
            <h2>I make small businesses <em>look like they mean it.</em></h2>
            <div>
              <p className="lead">Hi, I’m Erik. Web developer based in the United States. I focus on clean interfaces, responsive layouts and sites that are easy to understand, fast to use, and ready to help a business grow.</p>
              <div className="meta"><span>FOCUS <b>WEB / UI</b></span><span>STATUS <b>AVAILABLE</b></span><span>APPROACH <b>DESIGN · BUILD · POLISH</b></span></div>
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-top"><span>02 / SELECTED WORK</span><span>BUILT WITH INTENT</span></div>
          <div className="projects">
            {projects.map((project, i) => (
              <article className="project" key={project.name}>
                <div className={`project-art ${project.className}`}>
                  <div className="art-glow" />
                  <span>{project.n}</span>
                  <div className="art-label">{i === 0 ? 'ROYAL TOUCH' : i === 1 ? 'FOG / 03' : 'B1O / INTERFACE'}</div>
                </div>
                <div className="project-info"><span>{project.n}</span><div><h3>{project.name}</h3><p>{project.type}</p><small>{project.tags}</small></div><b>↗</b></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-top"><span>03 / SERVICES</span><span>WHAT I BUILD</span></div>
          <div className="service-list">{services.map(([n, title, description]) => <div className="service" key={n}><span>{n}</span><h3>{title}</h3><p>{description}</p><i>↗</i></div>)}</div>
        </section>

        <section className="section process">
          <div className="section-top"><span>04 / PROCESS</span><span>FROM IDEA TO LAUNCH</span></div>
          <div className="process-grid">{process.map(([n, title, description]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
        </section>

        <section className="section toolkit">
          <div className="section-top"><span>05 / TOOLKIT</span><span>THE MATERIALS</span></div>
          <div className="tools">{toolkit.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, '0')}</span><strong>{item}</strong></div>)}</div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-orb" />
          <div className="section-top"><span>06 / CONTACT</span><span>LET'S MAKE IT CLEAR</span></div>
          <div className="contact-inner"><p>HAVE SOMETHING WORTH BUILDING?</p><h2>Let's make<br /><em>it clear.</em></h2><div className="contact-links"><a href={FIVERR_URL} target="_blank" rel="noreferrer">START A PROJECT ↗</a><a href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a></div></div>
        </section>
      </main>

      <footer><span>ERIK / WEB</span><span>DESIGN · BUILD · POLISH</span><span>© 2026</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
