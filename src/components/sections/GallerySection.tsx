import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', alt: 'Pool Villa', tall: true },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', alt: 'Suite Interior', tall: false },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800', alt: 'Fine Dining', tall: false },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800', alt: 'Grand Events', tall: true },
  { src: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=800', alt: 'Spa', tall: false },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800', alt: 'Palace Exterior', tall: false },
  { src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', alt: 'Deluxe Room', tall: true },
  { src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=800', alt: 'Laal Maas', tall: false },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800', alt: 'Dessert', tall: false },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          delay: (i % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openLightbox = (src: string) => {
    setLightboxImg(src);
    if (lightboxRef.current) {
      lightboxRef.current.style.display = 'flex';
      gsap.fromTo(lightboxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(lightboxRef.current.querySelector('img'),
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  };

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setLightboxImg(null);
          if (lightboxRef.current) lightboxRef.current.style.display = 'none';
        },
      });
    }
  };

  return (
    <section ref={sectionRef} id="gallery" style={{ background: '#0d0d0d', padding: '8rem 0' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            Photo Gallery
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>
            Visual <span style={{ fontStyle: 'italic', color: '#c5a059' }}>Stories</span>
          </h2>
          <OrnamentDivider dark className="my-6" />
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              ref={el => { imgRefs.current[i] = el; }}
              className="masonry-item"
              onClick={() => openLightbox(img.src)}
              style={{ position: 'relative', cursor: 'none' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                loading="lazy"
                style={{ aspectRatio: img.tall ? '3/4' : '4/3' }}
              />
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.4s ease',
              }}
                onMouseEnter={e => gsap.to(e.currentTarget, { backgroundColor: 'rgba(0,0,0,0.45)', duration: 0.3 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.3 })}
              >
                <ZoomIn color="#c5a059" size={28} style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                  className="gallery-zoom-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        ref={lightboxRef}
        style={{
          display: 'none',
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 8000,
          alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(20px)',
        }}
        onClick={closeLightbox}
      >
        {lightboxImg && (
          <img
            src={lightboxImg}
            alt="Gallery fullscreen"
            referrerPolicy="no-referrer"
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          />
        )}
        <button
          onClick={closeLightbox}
          style={{
            position: 'absolute', top: '2rem', right: '2rem',
            background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.3)',
            color: '#c5a059', padding: '0.75rem', cursor: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.2)', scale: 1.1, duration: 0.3 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.1)', scale: 1, duration: 0.3 })}
        >
          <X size={20} />
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
