import { useRef, useState } from 'react';
import gsap from 'gsap';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    padding: '1rem 1.25rem',
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    outline: 'none',
    fontWeight: 300,
    transition: 'border-color 0.3s ease, background 0.3s ease',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.currentTarget, { borderColor: 'rgba(197,160,89,0.6)', background: 'rgba(197,160,89,0.04)', duration: 0.3 });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', duration: 0.3 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={sectionRef} id="contact" style={{ background: '#0d0d0d', padding: '8rem 0', position: 'relative' }}>
      {/* Map-like visual background: gradient with map pin aesthetic */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 50%, rgba(197,160,89,0.03) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            Get in Touch
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>
            Contact & <span style={{ fontStyle: 'italic', color: '#c5a059' }}>Location</span>
          </h2>
          <OrnamentDivider dark className="my-6" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* Left: contact info + embedded map area */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '3.5rem' }}>
              {[
                { icon: <MapPin size={20} color="#c5a059" />, title: 'Hotel Address', content: '6/2, Palace Road, Udaipur\nRajasthan 313001, India' },
                { icon: <Phone size={20} color="#c5a059" />, title: 'Telephone', content: '+91 (294) 4545 1234' },
                { icon: <Mail size={20} color="#c5a059" />, title: 'Email', content: 'reservations@devansh.in' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '46px', height: '46px', flexShrink: 0,
                    border: '1px solid rgba(197,160,89,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(197,160,89,0.05)',
                    transition: 'all 0.3s ease',
                  }}
                    onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.12)', scale: 1.05, duration: 0.3 })}
                    onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.05)', scale: 1, duration: 0.3 })}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.55rem', letterSpacing: '0.35em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '0.4rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded map (Google Maps iframe) */}
            <div style={{ border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.825898043817!2d73.6853!3d24.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5c9a8200001%3A0x6c2b3a8a8a8a8a8a!2sUdaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Devansh Palace Location"
              />
              {/* Map overlay brand */}
              <div style={{
                position: 'absolute', bottom: '1rem', right: '1rem',
                background: 'rgba(13,13,13,0.9)',
                border: '1px solid rgba(197,160,89,0.3)',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                color: '#c5a059',
                backdropFilter: 'blur(8px)',
              }}>
                Devansh Palace
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            {sent ? (
              <div className="glass-dark" style={{ padding: '3rem', textAlign: 'center', border: '1px solid rgba(197,160,89,0.15)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>✉️</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#c5a059', marginBottom: '1rem', fontWeight: 300 }}>Message Sent</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300 }}>
                  Thank you for reaching out. Our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem' }}>
                  Send us a message
                </div>

                <input
                  type="text"
                  placeholder="Your Full Name"
                  style={inputStyle}
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  style={inputStyle}
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                <textarea
                  placeholder="Tell us about your inquiry — special occasions, group bookings, or general questions..."
                  style={{ ...inputStyle, resize: 'none', height: '160px' } as React.CSSProperties}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  onFocus={handleFocus as any}
                  onBlur={handleBlur as any}
                  rows={6}
                  required
                />

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
                >
                  Send Message <ArrowRight size={16} />
                </button>

                {/* Proximity info */}
                <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
                    ✈ 25 mins from Maharana Pratap International Airport
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)', fontWeight: 300, marginTop: '0.5rem' }}>
                    🚂 10 mins from Udaipur City Railway Station
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
