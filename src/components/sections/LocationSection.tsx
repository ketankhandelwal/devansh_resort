import { motion } from 'motion/react';
import { MapPin, Phone, Calendar } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

const LocationSection = () => {
  return (
    <section className="relative h-[800px] w-full">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800"
          alt="Location"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl w-full"
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Devansh Palace Udaipur</h2>
          <OrnamentDivider lineWidth="w-24" dark className="mb-12" />

          <div className="inline-block border-b border-gold/50 pb-2 mb-12">
            <span className="text-sm uppercase tracking-[0.3em] font-medium">Hotel Coordinates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24 text-left mb-16">
            <div className="flex items-start space-x-6">
              <MapPin className="text-gold w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/80 mb-2">Hotel Address:</h4>
                <p className="text-lg font-serif leading-relaxed">6/2, Palace Road, <br />Udaipur, Rajasthan <br />313001, India</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="text-gold w-8 h-8 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/80 mb-2">Proximity:</h4>
                <p className="text-lg font-serif leading-relaxed">25 mins from Maharana Pratap <br />International Airport</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 md:col-span-2 md:justify-center">
              <Phone className="text-gold w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/80 mb-2">Telephone:</h4>
                <p className="text-2xl font-serif leading-relaxed">+91 (294) 4545 1234</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="border border-gold text-gold px-12 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all">
              Hotel Factsheet
            </button>
            <button className="bg-gold text-white px-12 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-ink transition-all">
              FAQs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
