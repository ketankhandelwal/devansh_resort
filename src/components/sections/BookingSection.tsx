import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Calendar, Users, BedDouble, ArrowRight } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

const ROOM_TYPES = ['Deluxe Room', 'Junior Suite', 'Royal Suite', 'Private Villa', 'Maharaja Suite'];

const BookingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    checkin: '', checkout: '', guests: '2', roomType: 'Junior Suite',
    name: '', email: '', phone: '', requests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const line = e.currentTarget.nextElementSibling as HTMLElement;
    if (line) gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power3.out', transformOrigin: 'left' });
    gsap.to(e.currentTarget, { color: '#e8c787', duration: 0.3 });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const line = e.currentTarget.nextElementSibling as HTMLElement;
    if (line && !e.currentTarget.value) {
      gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power3.in', transformOrigin: 'left' });
    }
    gsap.to(e.currentTarget, { color: '#fff', duration: 0.3 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      gsap.to(formRef.current, { opacity: 0, scale: 0.97, duration: 0.4, ease: 'power2.in', onComplete: () => setSubmitted(true) });
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    padding: '0.75rem 0 0.5rem',
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    outline: 'none',
    fontWeight: 300,
    cursor: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.55rem',
    letterSpacing: '0.35em',
    color: '#c5a059',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-sans)',
    display: 'block',
    marginBottom: '0.25rem',
  };

  const glowLineStyle: React.CSSProperties = {
    display: 'block',
    height: '1px',
    background: '#c5a059',
    transform: 'scaleX(0)',
    marginTop: '-1px',
    transformOrigin: 'left',
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden', background: '#111' }}
    >
      {/* Bg image with overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.08,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #111 30%, rgba(17,17,17,0.6) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

          {/* Left: Info */}
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
              Reservations
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>
              Plan Your <br /><span style={{ fontStyle: 'italic', color: '#c5a059' }}>Stay</span>
            </h2>
            <OrnamentDivider dark className="mb-8" lineWidth="w-12" />
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, fontWeight: 300, marginBottom: '3rem', maxWidth: '42ch' }}>
              Let us craft your perfect Devansh experience. Our dedicated concierge team ensures every detail of your stay is tailored to surpass your expectations.
            </p>

            {/* Quick info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: <Calendar size={18} color="#c5a059" />, label: 'Check-in Time', value: '3:00 PM onwards' },
                { icon: <BedDouble size={18} color="#c5a059" />, label: 'Check-out Time', value: 'Until 12:00 Noon' },
                { icon: <Users size={18} color="#c5a059" />, label: 'Concierge', value: '+91 294 4545 1234' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', padding: '0.6rem', display: 'flex' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontFamily: 'var(--font-serif)', marginTop: '0.15rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-dark" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.07)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✨</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#c5a059', marginBottom: '1rem', fontWeight: 300 }}>
                  Reservation Received
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 }}>
                  Our concierge team will contact you within the next hour to confirm and personalise your stay at Devansh Palace.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={labelStyle}>Check-in Date</label>
                    <input type="date" className="booking-input" value={form.checkin} onChange={e => setForm(p => ({ ...p, checkin: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, colorScheme: 'dark' }} required />
                    <span style={glowLineStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Check-out Date</label>
                    <input type="date" className="booking-input" value={form.checkout} onChange={e => setForm(p => ({ ...p, checkout: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, colorScheme: 'dark' }} required />
                    <span style={glowLineStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={labelStyle}>Guests</label>
                    <select style={{ ...inputStyle, cursor: 'none' }} value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur}>
                      {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} style={{ background: '#1a1a1a' }}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                    </select>
                    <span style={glowLineStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Room Type</label>
                    <select style={{ ...inputStyle, cursor: 'none' }} value={form.roomType} onChange={e => setForm(p => ({ ...p, roomType: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur}>
                      {ROOM_TYPES.map(r => <option key={r} value={r} style={{ background: '#1a1a1a' }}>{r}</option>)}
                    </select>
                    <span style={glowLineStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" placeholder="Your full name" style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} required />
                  <span style={glowLineStyle} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" placeholder="your@email.com" style={inputStyle} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} required />
                    <span style={glowLineStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" style={inputStyle} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} />
                    <span style={glowLineStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Special Requests</label>
                  <textarea
                    placeholder="Anniversary celebration, dietary preferences, accessibility needs..."
                    style={{ ...inputStyle, resize: 'none', height: '70px' } as React.CSSProperties}
                    value={form.requests}
                    onChange={e => setForm(p => ({ ...p, requests: e.target.value }))}
                    onFocus={handleFocus as any}
                    onBlur={handleBlur as any}
                    rows={3}
                  />
                  <span style={glowLineStyle} />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
                >
                  Request Reservation <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
