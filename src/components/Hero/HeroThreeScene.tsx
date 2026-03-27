import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const HeroThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Gold warm point light
    const goldLight = new THREE.PointLight(0xc5a059, 2, 30);
    goldLight.position.set(4, 6, 4);
    scene.add(goldLight);

    // Cool blue fill light
    const blueLight = new THREE.PointLight(0x4488cc, 0.8, 20);
    blueLight.position.set(-6, -2, 3);
    scene.add(blueLight);

    // ── Floating particles ──
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc5a059,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Floating geometric shapes (luxury hotel motif) ──
    const shapes: THREE.Mesh[] = [];

    // Large octahedron (center piece)
    const octaGeo = new THREE.OctahedronGeometry(1.2, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(3, 1, -2);
    scene.add(octa);
    shapes.push(octa);

    // Smaller icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.6, 0);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xe8c787,
      metalness: 0.95,
      roughness: 0.05,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-3.5, -1.5, -1);
    scene.add(ico);
    shapes.push(ico);

    // Ring torus
    const torusGeo = new THREE.TorusGeometry(1.8, 0.004, 8, 80);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.25 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(0, 0, -3);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    // Second ring
    const torus2Geo = new THREE.TorusGeometry(2.4, 0.003, 8, 80);
    const torus2Mat = new THREE.MeshBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.12 });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.position.set(0, 0, -4);
    torus2.rotation.x = -Math.PI / 4;
    torus2.rotation.y = Math.PI / 6;
    scene.add(torus2);

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse tracking
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Particle rotation
      particles.rotation.y = elapsed * 0.05 + targetX * 0.2;
      particles.rotation.x = elapsed * 0.02 + targetY * 0.1;

      // Shape animations
      octa.rotation.x = elapsed * 0.4;
      octa.rotation.y = elapsed * 0.3;
      octa.position.y = 1 + Math.sin(elapsed * 0.8) * 0.3;

      ico.rotation.x = elapsed * 0.5;
      ico.rotation.z = elapsed * 0.3;
      ico.position.y = -1.5 + Math.sin(elapsed * 0.6 + 1) * 0.4;

      torus.rotation.z = elapsed * 0.15;
      torus2.rotation.z = -elapsed * 0.1;

      // Camera subtle movement with mouse
      camera.position.x = targetX * 0.5;
      camera.position.y = -targetY * 0.3;
      camera.lookAt(0, 0, 0);

      // Gold light animation
      goldLight.position.x = Math.sin(elapsed * 0.5) * 5;
      goldLight.position.y = Math.cos(elapsed * 0.4) * 4 + 3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{ position: 'absolute', inset: 0, zIndex: 1, width: '100%', height: '100%' }}
    />
  );
};

export default HeroThreeScene;
