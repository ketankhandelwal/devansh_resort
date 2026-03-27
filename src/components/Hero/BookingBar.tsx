import { MapPin, Calendar, User, Search } from 'lucide-react';

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

export default BookingBar;
