import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const sub = subRef.current;
    const fill = fillRef.current;
    const canvas = canvasRef.current;
    if (!loader || !logo || !sub || !fill || !canvas) return;

    // Three.js particle bg for loader
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geo = new THREE.BufferGeometry();
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 0.025, color: 0xc5a059, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // GSAP loader timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (loader) loader.style.display = 'none';
            cancelAnimationFrame(animId);
            renderer.dispose();
            onComplete();
          },
        });
      },
    });

    tl.to(logo, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.3)
      .to(sub, { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.7)
      .to(fill, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, 0.5)
      .to({}, { duration: 0.4 });

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} id="loader">
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div ref={logoRef} className="loader-logo" style={{ transform: 'translateY(20px)' }}>
          DEVANSH
        </div>
        <div ref={subRef} className="loader-sub">Resort · Hotels · Restaurant</div>
      </div>
      <div className="loader-progress">
        <div ref={fillRef} className="loader-progress-fill" />
      </div>
    </div>
  );
};

export default Loader;
