import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroThreeScene from './HeroThreeScene';

const HERO_SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=85&w=1920',
    headline: ['A Premier', 'Sanctuary'],
    sub: 'Nestled Within Nature\'s Embrace',
    label: 'Udaipur, Rajasthan',
  },
  {
    bg: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=85&w=1920',
    headline: ['Private', 'Villas'],
    sub: 'Exclusive Seclusion & Timeless Luxury',
    label: 'Lake Pichola Views',
  },
  {
    bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=85&w=1920',
    headline: ['Fine', 'Dining'],
    sub: 'Authentic Rajasthani Culinary Heritage',
    label: 'Award-Winning Cuisine',
  },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const slideRef = useRef(0);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);

  // Initial entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Split headline chars
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.hero-line');
      lines.forEach((line) => {
        const text = line.textContent || '';
        line.innerHTML = text.split('').map(c => `<span class="hero-char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span></span>`).join('');
      });

      const chars = headlineRef.current.querySelectorAll('.hero-char > span');
      tl.from(chars, {
        y: '110%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.04,
        ease: 'power4.out',
      }, 0);
    }

    tl.from(subRef.current, { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out' }, 0.5)
      .from(labelRef.current, { opacity: 0, y: 10, duration: 0.7, ease: 'power3.out' }, 0.7)
      .from(ctaRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.8, ease: 'power3.out' }, 0.9);
  }, []);

  // Slide change
  const goToSlide = (idx: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const prev = slideRef.current;
    slideRef.current = idx;

    const prevBg = bgRefs.current[prev];
    const nextBg = bgRefs.current[idx];
    if (!prevBg || !nextBg) { isAnimating.current = false; return; }

    gsap.set(nextBg, { zIndex: 2, opacity: 0, scale: 1.1 });
    gsap.to(nextBg, { opacity: 1, scale: 1.03, duration: 1.2, ease: 'power2.inOut', onComplete: () => {
      gsap.set(prevBg, { zIndex: 0, scale: 1 });
      isAnimating.current = false;
    }});
    gsap.to(prevBg, { opacity: 0, duration: 1, ease: 'power2.inOut' });
  };

  // Auto-slide every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (slideRef.current + 1) % HERO_SLIDES.length;
      goToSlide(next);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax on hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 20;
      const cy = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(bgRefs.current, { x: cx, y: cy, duration: 1.5, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden">

      {/* Background Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          ref={el => { bgRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ zIndex: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.bg})`,
              transform: 'scale(1.05)',
              willChange: 'transform',
            }}
          />
        </div>
      ))}

      {/* Three.js scene overlay */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <HeroThreeScene />
      </div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 luxury-gradient" style={{ zIndex: 4 }} />
      <div className="absolute inset-0 bg-ink/30" style={{ zIndex: 4 }} />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 5 }}>

        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-3 mb-8">
          <div style={{ width: 40, height: 1, background: 'rgba(197,160,89,0.6)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            {HERO_SLIDES[0].label}
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(197,160,89,0.6)' }} />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 11vw, 9rem)',
            lineHeight: 0.9,
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: 'white',
            marginBottom: '1.5rem',
          }}
        >
          <span className="hero-line" style={{ display: 'block', fontStyle: 'italic' }}>A Premier</span>
          <span className="hero-line" style={{ display: 'block' }}>Sanctuary</span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase',
            fontWeight: 300,
            marginBottom: '3rem',
          }}
        >
          {HERO_SLIDES[0].sub}
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={scrollToNext}
          className="btn-gold group relative overflow-hidden"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
          }}
        >
          Discover More
        </button>

        {/* Side CTA outline */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
          <button
            className="btn-outline"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
          >
            Reserve Now
          </button>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem', zIndex: 6 }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: i === 0 ? '2rem' : '0.5rem',
              height: '2px',
              background: i === 0 ? '#c5a059' : 'rgba(255,255,255,0.3)',
              border: 'none',
              padding: 0,
              cursor: 'none',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 6,
          cursor: 'none',
        }}
        onClick={scrollToNext}
      >
        <div style={{ writingMode: 'vertical-rl', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
          Scroll
        </div>
        <div style={{ width: 1, height: '3rem', background: 'linear-gradient(to bottom, rgba(197,160,89,0.8), transparent)', animation: 'fadeIn 2s ease infinite alternate' }} />
      </div>
    </section>
  );
};

export default Hero;
