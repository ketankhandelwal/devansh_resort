/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Loader from './components/common/Loader';
import CustomCursor from './components/common/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import AboutSection from './components/sections/AboutSection';
import RoomsSection from './components/sections/RoomsSection';
import DiningSection from './components/sections/DiningSection';
import ExperienceSection from './components/sections/ExperienceSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BookingSection from './components/sections/BookingSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh' }}>
      {/* Cinematic Loader */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main content */}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />

        <main>
          {/* 1. Hero — Three.js + GSAP */}
          <Hero />

          {/* 2. About Us */}
          <AboutSection />

          {/* 3. Rooms & Suites */}
          <RoomsSection />

          {/* 4. Restaurant & Dining */}
          <DiningSection />

          {/* 5. Experiences & Amenities */}
          <ExperienceSection />

          {/* 6. Gallery */}
          <GallerySection />

          {/* 7. Testimonials */}
          <TestimonialsSection />

          {/* 8. Booking Section */}
          <BookingSection />

          {/* 9. Contact & Location */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
