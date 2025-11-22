import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onGoHome: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onGoHome, language, onToggleLanguage, onOpenProfile }) => {
  const t = TRANSLATIONS[language];
  const [animateCart, setAnimateCart] = useState(false);

  // Trigger animation when cart count increases
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#FFFDF5]/95 backdrop-blur-md border-b border-[#FF9F1C]/30 shadow-sm transition-all duration-300">
      {/* Colorful Gradient Strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7A1F1F] via-[#E31837] to-[#FF9F1C]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo: God Kannan (Baby Krishna) */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3 group" onClick={onGoHome}>
            <div className="relative w-14 h-14 flex items-center justify-center p-1 bg-gradient-to-br from-[#FF9F1C] to-[#F8F5EC] rounded-full shadow-sm">
               <img 
                 src="https://imgs.search.brave.com/y_stKpE_8-CCrjLZLrrbenWog-0GSfa4mTrG_TeKKk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzAwLzE3Lzg3/LzM2MF9GXzE2MDAx/Nzg3NTJfdlowcWRx/QjJPWjY0ZmZRTlFZ/T3BhN05HeW5CVTB4/VzcuanBn" 
                 alt="Baby Krishna" 
                 className="w-full h-full object-contain drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500"
               />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-wide text-[#7A1F1F] leading-none drop-shadow-sm">Kannan</span>
              <span className="text-[10px] text-[#E31837] font-bold tracking-[0.2em] uppercase mt-1">Pure Grocery</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-search text-[#FF9F1C] group-focus-within:text-[#E31837] transition-colors duration-300 text-lg"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-[#FF9F1C]/30 rounded-full leading-5 bg-white placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] sm:text-sm transition duration-300 ease-in-out shadow-sm hover:shadow-md"
                placeholder={t.searchPlaceholder}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF9F1C]/10 to-[#E31837]/10 border border-[#E31837]/20 hover:bg-white hover:shadow-md transition-all duration-300 text-xs font-bold text-[#7A1F1F]"
            >
              <i className="fa-solid fa-language text-lg text-[#E31837]"></i>
              <span className="mt-0.5 font-heading">{language === 'en' ? 'ENG' : 'தமிழ்'}</span>
            </button>

            <div className="h-6 w-px bg-[#FF9F1C]/30 mx-1"></div>

            <button 
              className="w-10 h-10 rounded-full hover:bg-[#E31837]/10 flex items-center justify-center text-[#7A1F1F] transition-all duration-300 active:scale-95 hover:text-[#E31837]"
              onClick={onOpenProfile}
            >
              <i className="fa-regular fa-user text-lg"></i>
            </button>
            
            <button 
              className={`relative w-10 h-10 rounded-full hover:bg-[#0A6847]/10 flex items-center justify-center text-[#7A1F1F] transition-all duration-300 ${animateCart ? 'animate-cart-pop text-[#2ECC71]' : 'hover:text-[#0A6847]'}`}
              onClick={onCartClick}
            >
              <i className={`fa-solid fa-bag-shopping text-xl ${animateCart ? 'scale-110' : ''} transition-transform`}></i>
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white transform bg-[#2ECC71] rounded-full shadow-md border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};