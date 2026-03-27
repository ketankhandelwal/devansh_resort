/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4 shadow-md' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button className="flex items-center text-sm font-medium uppercase tracking-widest hover:text-gold transition-colors">
            <Menu className="w-5 h-5 mr-2" />
          </button>
          <div className="flex items-center space-x-6">
            <a href="#" className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors ${isScrolled ? 'text-ink' : 'text-white'}`}>Hotels <ChevronDown className="inline w-3 h-3 ml-1" /></a>
            <a href="#" className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors ${isScrolled ? 'text-ink' : 'text-white'}`}>Experiences</a>
            <a href="#" className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors ${isScrolled ? 'text-ink' : 'text-white'}`}>Offers</a>
          </div>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-serif tracking-[0.3em] font-light ${isScrolled ? 'text-ink' : 'text-white'}`}>DEVANSH</span>
          <span className={`text-[8px] uppercase tracking-[0.5em] mt-1 ${isScrolled ? 'text-gold' : 'text-white/80'}`}>Resort | Hotels | Restaurant</span>
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className={`flex items-center text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors ${isScrolled ? 'text-ink' : 'text-white'}`}>
              <User className="w-4 h-4 mr-2" /> Login
            </a>
          </div>
          <button className="bg-gold text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-ink transition-all duration-300 shadow-lg">
            Book
          </button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white w-full overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              <a href="#" className="text-sm uppercase tracking-widest font-medium border-b border-gray-100 pb-2">Hotels</a>
              <a href="#" className="text-sm uppercase tracking-widest font-medium border-b border-gray-100 pb-2">Experiences</a>
              <a href="#" className="text-sm uppercase tracking-widest font-medium border-b border-gray-100 pb-2">Offers</a>
              <a href="#" className="text-sm uppercase tracking-widest font-medium border-b border-gray-100 pb-2">Login</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BookingBar = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-20">
      <div className="bg-ink/90 backdrop-blur-md border border-white/10 p-2 flex flex-col md:flex-row items-stretch shadow-2xl">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4 flex items-center space-x-3 group cursor-pointer">
            <MapPin className="text-gold w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase tracking-widest">Destination</span>
              <span className="text-sm text-white font-medium">Devansh Palace, Udaipur</span>
            </div>
          </div>
          <div className="p-4 flex items-center space-x-3 group cursor-pointer">
            <Calendar className="text-gold w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase tracking-widest">Check-in - Check-out</span>
              <span className="text-sm text-white font-medium">Select Dates</span>
            </div>
          </div>
          <div className="p-4 flex items-center space-x-3 group cursor-pointer">
            <User className="text-gold w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase tracking-widest">Guests</span>
              <span className="text-sm text-white font-medium">2 Adults, 0 Children</span>
            </div>
          </div>
          <div className="p-4 flex items-center space-x-3 group cursor-pointer">
            <Search className="text-gold w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase tracking-widest">Promo Code</span>
              <span className="text-sm text-white font-medium">Add Code</span>
            </div>
          </div>
        </div>
        <button className="bg-gold hover:bg-white hover:text-ink text-white px-12 py-6 md:py-0 text-sm uppercase tracking-[0.2em] font-bold transition-all duration-300">
          Book Now
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="text-[10px] text-white/60 uppercase tracking-widest flex items-center">
          <span className="w-4 h-4 border border-gold rounded-full flex items-center justify-center mr-2 text-[8px] text-gold">✓</span>
          Best Rate Guarantee
        </span>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Resort" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 luxury-gradient" />
      </motion.div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-white text-4xl md:text-7xl font-serif tracking-tight leading-tight max-w-4xl">
            A PREMIER SANCTUARY NESTLED <br />
            <span className="italic">WITHIN NATURE'S EMBRACE</span>
          </h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 border border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-4 text-xs uppercase tracking-[0.3em] font-medium hover:bg-white hover:text-ink transition-all duration-300"
          >
            Know More
          </motion.button>
        </motion.div>
      </div>

      <BookingBar />

      {/* Slider Controls */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-4">
        <button className="text-white/50 hover:text-white transition-colors"><ChevronLeft className="w-8 h-8" /></button>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-4">
        <button className="text-white/50 hover:text-white transition-colors"><ChevronRight className="w-8 h-8" /></button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full border border-white ${i === 0 ? 'bg-white' : 'bg-transparent'}`} />
        ))}
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-serif text-ink mb-4"
    >
      {title}
    </motion.h2>
    <div className="flex items-center justify-center space-x-4">
      <div className="h-[1px] w-12 bg-gold/30" />
      <div className="text-gold">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 18C25 18 30 10 38 10M20 18C15 18 10 10 2 10" stroke="currentColor" strokeWidth="1" />
          <path d="M20 2C15 2 10 10 2 10M20 2C25 2 30 10 38 10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="h-[1px] w-12 bg-gold/30" />
    </div>
    <p className="mt-4 text-xs uppercase tracking-[0.4em] text-gold font-medium">{subtitle}</p>
  </div>
);

const StaySection = () => {
  const suites = [
    {
      name: "Presidential Suite",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
      desc: "The pinnacle of luxury with panoramic views."
    },
    {
      name: "Luxury Suite",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
      desc: "Refined elegance for the discerning traveler."
    },
    {
      name: "Executive Suite",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
      desc: "Perfect balance of comfort and style."
    }
  ];

  return (
    <section className="py-32 bg-cream/30 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Stay & Revel" subtitle="Accommodations" />
        
        <div className="flex items-center justify-center mb-16">
          <div className="h-[1px] w-16 bg-gold/30" />
          <div className="mx-4 text-gold">
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 25C40 25 50 5 58 5M30 25C20 25 10 5 2 5" stroke="currentColor" strokeWidth="1" />
              <path d="M30 5C20 5 10 25 2 25M30 5C40 5 50 25 58 25" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="h-[1px] w-16 bg-gold/30" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suites.map((suite, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6 shadow-xl">
                <img 
                  src={suite.image} 
                  alt={suite.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full bg-white text-ink py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-colors">
                    Explore Suite
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-center mb-2">{suite.name}</h3>
              <p className="text-center text-sm text-gray-500 font-light italic">{suite.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DiningSection = () => {
  const restaurants = [
    {
      name: "The Grand Pavilion",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
      desc: "Exquisite global flavors in a majestic setting."
    },
    {
      name: "Azure Sky Bar",
      type: "Rooftop Lounge",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
      desc: "Crafted cocktails with a view of the horizon."
    },
    {
      name: "Spice Route",
      type: "Authentic Indian",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      desc: "A journey through India's rich culinary heritage."
    }
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Epicurean Delights" subtitle="Dining & Bars" />
        
        <div className="flex items-center justify-center mb-16">
          <div className="h-[1px] w-16 bg-gold/30" />
          <div className="mx-4 text-gold">
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 25C40 25 50 5 58 5M30 25C20 25 10 5 2 5" stroke="currentColor" strokeWidth="1" />
              <path d="M30 5C20 5 10 25 2 25M30 5C40 5 50 25 58 25" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="h-[1px] w-16 bg-gold/30" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {restaurants.map((rest, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="flex flex-col"
            >
              <div className="relative overflow-hidden aspect-video mb-8 shadow-lg">
                <img 
                  src={rest.image} 
                  alt={rest.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="border-l-2 border-gold pl-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-2 block">{rest.type}</span>
                <h3 className="text-3xl font-serif mb-4">{rest.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{rest.desc}</p>
                <button className="flex items-center text-[10px] uppercase tracking-widest font-bold hover:text-gold transition-colors">
                  View Menu <ArrowRight className="w-3 h-3 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920" 
          alt="Events" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 text-white"
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Meetings & <br /><span className="italic">Grand Events</span></h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-xl leading-relaxed">
            From intimate gatherings to grand celebrations, our versatile venues provide the perfect backdrop for your most memorable moments. Our dedicated events team ensures every detail is executed with precision and elegance.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="bg-gold text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-ink transition-all">
              Request Proposal
            </button>
            <button className="border border-white/30 text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all">
              View Venues
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 grid grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" className="w-full aspect-square object-cover shadow-2xl" alt="Wedding" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=400" className="w-full aspect-[3/4] object-cover shadow-2xl" alt="Conference" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-4 pt-12">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400" className="w-full aspect-[3/4] object-cover shadow-2xl" alt="Gala" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=400" className="w-full aspect-square object-cover shadow-2xl" alt="Party" referrerPolicy="no-referrer" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialGrid = () => {
  const posts = [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400"
  ];

  return (
    <section className="py-32 bg-cream/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Show us your @Devansh</h2>
          <p className="text-sm text-gray-500 tracking-widest uppercase">Share your moments with us using #DevanshMoments</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {posts.map((post, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden group"
            >
              <img src={post} className="w-full h-full object-cover" alt="Social" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-ink text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-serif tracking-[0.3em] font-light">DEVANSH</span>
              <span className="text-[8px] uppercase tracking-[0.5em] mt-1 text-gold">Resort | Hotels | Restaurant</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-light mb-8">
              Experience the pinnacle of luxury and hospitality. Devansh offers a sanctuary of refinement and elegance across our world-class properties.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/50 hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white/50 hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Properties</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dining Experiences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wellness & Spa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-8">Contact Us</h4>
            <ul className="space-y-6 text-sm text-white/60 font-light">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span>6/2, Palace Road, Udaipur, Rajasthan 313001, India</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>+91 (294) 4545 1234</span>
              </li>
              <li className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-gold shrink-0" />
                <span>reservations@devansh.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-8">Newsletter</h4>
            <p className="text-sm text-white/60 font-light mb-6">Subscribe to receive exclusive offers and updates.</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30"
              />
              <button className="text-gold hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            © 2026 DEVANSH RESORTS & HOTELS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-gold selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Welcome Section */}
        <section className="pt-48 pb-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-serif text-ink mb-10">Stay & Revel</h2>
              <div className="flex items-center justify-center mb-10">
                <div className="h-[1px] w-24 bg-gold/30" />
                <div className="mx-4 text-gold">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 25C40 25 50 5 58 5M30 25C20 25 10 5 2 5" stroke="currentColor" strokeWidth="1" />
                    <path d="M30 5C20 5 10 25 2 25M30 5C40 5 50 25 58 25" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <div className="h-[1px] w-24 bg-gold/30" />
              </div>
              <p className="text-lg text-gray-600 font-light leading-relaxed italic">
                "Discover a world where timeless elegance meets modern luxury. At Devansh, we curate experiences that transcend the ordinary, offering you a sanctuary of peace and refinement in the heart of Udaipur's majestic landscape."
              </p>
            </motion.div>
          </div>
        </section>

        <StaySection />
        <DiningSection />
        <ExperienceSection />
        <SocialGrid />
        
        {/* Location Section */}
        <section className="relative h-[800px] w-full">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
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
              <div className="flex items-center justify-center mb-12">
                <div className="h-[1px] w-24 bg-gold/50" />
                <div className="mx-4 text-gold">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 25C40 25 50 5 58 5M30 25C20 25 10 5 2 5" stroke="currentColor" strokeWidth="1" />
                    <path d="M30 5C20 5 10 25 2 25M30 5C40 5 50 25 58 25" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <div className="h-[1px] w-24 bg-gold/50" />
              </div>

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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
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
      </main>
      
      <Footer />
    </div>
  );
}
