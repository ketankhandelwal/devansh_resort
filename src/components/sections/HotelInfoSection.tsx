import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const HotelInfoSection = () => {
  return (
    <section className="bg-white px-6 py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Left: Title + Description + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-ink leading-tight mb-8">
            Devansh Palace<br />
            <span className="italic font-light">Udaipur, Rajasthan</span>
          </h2>

          <p className="text-base text-gray-500 font-light leading-relaxed mb-10 max-w-lg">
            Discover our 5-star luxury palace hotel, nestled on the shores of Lake Pichola
            in the City of Lakes. Explore our 120 opulent rooms and suites, each with sweeping
            views of the Aravalli Hills, then indulge in an authentic Rajasthani dining
            experience at our signature restaurants.
          </p>

          <button className="group flex items-center border border-ink text-ink px-8 py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-ink hover:text-white transition-all duration-300">
            Hotel Details
            <ArrowRight className="w-4 h-4 ml-3 -translate-x-1 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Right: Emblem + Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start gap-10"
        >
          {/* Emblem / Logo Block */}
          <div className="flex flex-col items-center text-center">
            {/* Decorative SVG Emblem */}
            <div className="w-20 h-20 mb-4 text-gold">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1" />
                <path d="M40 10 L44 28 L62 28 L48 38 L53 56 L40 46 L27 56 L32 38 L18 28 L36 28 Z" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M40 20 C50 25 55 35 40 40 C25 35 30 25 40 20Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
              </svg>
            </div>
            <span className="text-lg font-serif tracking-[0.2em] text-ink">DEVANSH</span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-gold mt-1">Resort | Hotels | Restaurant</span>
            <div className="w-10 h-[1px] bg-gold/40 mt-3" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-gray-400 mt-3">Udaipur</span>
          </div>

          {/* Contact Details */}
          <div className="w-full space-y-6 border-t border-gray-100 pt-8">
            <a
              href="mailto:reservations@devansh.com"
              className="flex items-center space-x-4 group"
            >
              <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                <Mail className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm text-gray-500 font-light group-hover:text-ink transition-colors">
                reservations@devansh.com
              </span>
            </a>

            <a
              href="tel:+912944545123"
              className="flex items-center space-x-4 group"
            >
              <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm text-gray-500 font-light group-hover:text-ink transition-colors">
                +91 (294) 4545 1234
              </span>
            </a>

            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm text-gray-500 font-light">
                Udaipur, Rajasthan, India
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HotelInfoSection;
