import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginPageProps {
  language: Language;
  onLogin: () => void;
  onToggleLanguage: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ language, onLogin, onToggleLanguage }) => {
  const t = TRANSLATIONS[language];
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFDF5]">
      {/* Left: Colorful Gradient Temple Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#7A1F1F] via-[#C02030] to-[#E31837] relative overflow-hidden items-center justify-center p-12">
        {/* Kolam Pattern Overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FF9F1C 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] border border-[#FF9F1C]/20 rounded-full animate-[spin_120s_linear_infinite] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border border-[#FF9F1C]/10 rounded-full animate-[spin_80s_linear_infinite_reverse] translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 text-center">
          <div className="w-56 h-56 mx-auto bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-[#FF9F1C]/50 mb-8 shadow-2xl p-6">
             <img 
               src="https://imgs.search.brave.com/y_stKpE_8-CCrjLZLrrbenWog-0GSfa4mTrG_TeKKk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzAwLzE3Lzg3/LzM2MF9GXzE2MDAx/Nzg3NTJfdlowcWRx/QjJPWjY0ZmZRTlFZ/T3BhN05HeW5CVTB4/VzcuanBn" 
               alt="Baby Krishna" 
               className="w-full h-full object-contain drop-shadow-lg" 
             />
          </div>
          <h1 className="font-heading text-6xl font-bold text-white mb-6 tracking-wide drop-shadow-md">Kannan Grocery</h1>
          <div className="w-24 h-1.5 bg-[#FF9F1C] mx-auto mb-10 rounded-full shadow-lg"></div>
          <p className="text-[#FF9F1C] text-2xl max-w-md mx-auto leading-relaxed font-heading font-light drop-shadow-sm">
            {language === 'ta' 
              ? "பாரம்பரியம் மற்றும் தரம் - கண்ணன் மளிகையில்." 
              : "Purity, Tradition, and Divine Taste in every grain."}
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-24 relative">
        {/* Mobile Background Pattern */}
        <div className="absolute inset-0 bg-kolam md:hidden opacity-10 pointer-events-none"></div>

        <div className="max-w-md w-full mx-auto relative z-10">
          <div className="flex justify-end mb-12">
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-2 text-xs font-bold text-[#E31837] bg-white border border-[#E31837]/20 px-5 py-2.5 rounded-full uppercase tracking-widest hover:bg-[#E31837]/5 hover:shadow-md transition"
            >
              <i className="fa-solid fa-language text-lg"></i>
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>

          <div className="mb-10">
            <div className="md:hidden w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-2 border-[#FF9F1C] mb-6 p-2 shadow-md">
              <img 
               src="https://imgs.search.brave.com/y_stKpE_8-CCrjLZLrrbenWog-0GSfa4mTrG_TeKKk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzAwLzE3Lzg3/LzM2MF9GXzE2MDAx/Nzg3NTJfdlowcWRx/QjJPWjY0ZmZRTlFZ/T3BhN05HeW5CVTB4/VzcuanBn" 
               alt="Baby Krishna" 
               className="w-full h-full object-contain" 
             />
            </div>
            <h2 className="font-heading text-4xl font-bold text-[#7A1F1F] mb-3">{t.loginWelcome}</h2>
            <p className="text-stone-500 font-medium text-lg">{t.loginSub}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#E31837] uppercase tracking-wider mb-2">{t.phoneLabel}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none border-r border-[#FF9F1C]/20 pr-3">
                  <span className="text-stone-400 font-bold group-focus-within:text-[#E31837]">+91</span>
                </div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-20 pr-4 py-4 bg-white border border-[#FF9F1C]/30 rounded-xl focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] outline-none transition shadow-sm hover:border-[#E31837]/50"
                  placeholder="98765 43210"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#E31837] uppercase tracking-wider mb-2">{t.passwordLabel}</label>
              <input 
                type="password" 
                className="block w-full px-4 py-4 bg-white border border-[#FF9F1C]/30 rounded-xl focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] outline-none transition shadow-sm hover:border-[#E31837]/50"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#7A1F1F] to-[#E31837] text-white py-4 rounded-xl font-bold font-heading tracking-wider hover:from-[#9b2c2c] hover:to-[#ff4d6d] transition shadow-lg shadow-[#E31837]/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              {t.loginBtn} <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
          </form>

          <div className="mt-10 text-center border-t border-[#FF9F1C]/10 pt-6">
            <p className="text-xs text-stone-400 font-medium">
              <i className="fa-solid fa-shield-halved text-[#2ECC71] mr-1.5"></i> Secure & Trusted Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};