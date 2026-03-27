import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import gsap from 'gsap';

const Footer = () => {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '6rem 0 2rem' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', letterSpacing: '0.35em', fontWeight: 300, color: '#fff' }}>
                DEVANSH
              </div>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginTop: '0.25rem' }}>
                Resort · Hotels · Restaurant
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.85, fontWeight: 300, maxWidth: '32ch', marginBottom: '2rem' }}>
              Experience the pinnacle of Rajasthani luxury on the shores of Lake Pichola. A sanctuary of refinement and timeless elegance.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { icon: <Instagram size={16} />, href: '#' },
                { icon: <Facebook size={16} />, href: '#' },
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Youtube size={16} />, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  style={{
                    width: '38px', height: '38px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => {
                    gsap.to(e.currentTarget, { borderColor: '#c5a059', color: '#c5a059', scale: 1.1, duration: 0.3 });
                  }}
                  onMouseLeave={e => {
                    gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', scale: 1, duration: 0.3 });
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: '2rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['About Us', 'Rooms & Suites', 'Dining', 'Experiences', 'Gallery', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover-line"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s ease', cursor: 'none' }}
                    onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', x: 4, duration: 0.3 })}
                    onMouseLeave={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.45)', x: 0, duration: 0.3 })}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: '2rem' }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Cancellation Policy', 'Accessibility', 'Sitemap', 'Careers'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, textDecoration: 'none', cursor: 'none', transition: 'color 0.3s ease' }}
                    onMouseEnter={e => gsap.to(e.currentTarget, { color: '#fff', x: 4, duration: 0.3 })}
                    onMouseLeave={e => gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.45)', x: 0, duration: 0.3 })}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: '2rem' }}>
              Stay Connected
            </h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.5rem' }}>
              Subscribe for exclusive offers, seasonal packages, and stories from Devansh.
            </p>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', flex: 1, fontWeight: 300 }}
              />
              <button
                style={{ color: '#c5a059', background: 'none', border: 'none', cursor: 'none', padding: '0.25rem', transition: 'all 0.3s ease' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { x: 3, scale: 1.2, duration: 0.3 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { x: 0, scale: 1, duration: 0.3 })}
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Awards */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['AAA 5 Diamond', 'Forbes Travel', 'Condé Nast'].map(award => (
                <div key={award} style={{
                  border: '1px solid rgba(197,160,89,0.2)',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(197,160,89,0.7)',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                }}>
                  {award}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)', marginBottom: '2rem' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
            © 2026 Devansh Resorts & Hotels Pvt. Ltd. All Rights Reserved.
          </p>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-sans)' }}>
            Udaipur · Rajasthan · India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
