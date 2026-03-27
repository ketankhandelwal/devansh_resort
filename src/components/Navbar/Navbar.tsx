import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = ['About', 'Rooms', 'Dining', 'Experiences', 'Gallery', 'Contact'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (isMenuOpen) {
      gsap.fromTo(menuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      const items = menuRef.current.querySelectorAll('.menu-item');
      gsap.from(items, { y: 20, opacity: 0, stagger: 0.07, duration: 0.4, ease: 'power3.out', delay: 0.1 });
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.in' });
    }
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-7'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Left links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.slice(0, 3).map((link, i) => (
            <a
              key={link}
              ref={el => { linkRefs.current[i] = el; }}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link); }}
              className="hover-line text-white/80 hover:text-white transition-colors"
              style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'none' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          className="flex flex-col items-center"
          style={{ cursor: 'none' }}
        >
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            letterSpacing: '0.35em',
            fontWeight: 300,
            color: isScrolled ? '#fff' : '#fff',
            lineHeight: 1,
          }}>
            DEVANSH
          </span>
          <span style={{
            fontSize: '0.5rem',
            letterSpacing: '0.5em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginTop: '0.25rem',
            fontFamily: 'var(--font-sans)',
          }}>
            Resort · Hotels · Restaurant
          </span>
        </a>

        {/* Right links */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(3).map((link, i) => (
              <a
                key={link}
                ref={el => { linkRefs.current[i + 3] = el; }}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}
                className="hover-line text-white/80 hover:text-white transition-colors"
                style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'none' }}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollTo('booking')}
            className="btn-gold hidden md:block"
            style={{ padding: '0.7rem 1.6rem', fontSize: '0.6rem' }}
          >
            Book Now
          </button>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ cursor: 'none', background: 'none', border: 'none', padding: '0.5rem' }}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div ref={menuRef} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
        <div className="glass-dark lg:hidden px-6 pt-6 pb-8">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                className="menu-item"
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.8)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '1rem',
                  cursor: 'none',
                }}
              >
                {link}
              </a>
            ))}
            <button
              className="btn-gold menu-item w-full text-center"
              onClick={() => scrollTo('booking')}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
