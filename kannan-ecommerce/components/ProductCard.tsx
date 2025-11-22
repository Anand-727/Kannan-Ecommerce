import React, { useState } from 'react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, language, onAddToCart, onViewDetails }) => {
  const [isAdded, setIsAdded] = useState(false);
  const displayName = language === 'ta' && product.nameTa ? product.nameTa : product.name;
  const displayCategory = language === 'ta' && product.categoryTa ? product.categoryTa : product.category;
  const t = TRANSLATIONS[language];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    onAddToCart(product);
    setTimeout(() => setIsAdded(false), 600); // Match animation duration
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-[#FF9F1C]/10 overflow-hidden hover:shadow-xl hover:shadow-[#E31837]/10 hover:-translate-y-2 hover:border-[#E31837]/30 transition-all duration-500 ease-out flex flex-col h-full relative animate-fade-in-up">
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer p-4 bg-[#FFFDF5] transition-colors duration-300 group-hover:bg-white"
        onClick={() => onViewDetails(product)}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
        <img 
          src={product.image} 
          alt={displayName} 
          className={`w-full h-full object-cover rounded-lg transition-transform duration-700 ease-in-out mix-blend-multiply ${isAdded ? 'animate-grab' : 'group-hover:scale-110'}`}
        />
        {/* Wishlist Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
          <button 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-2.5 rounded-full shadow-lg text-[#E31837] hover:bg-[#E31837] hover:text-white transition hover:scale-110 border border-[#E31837]/10"
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white z-10 relative">
        <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] font-bold text-[#E31837] uppercase tracking-widest bg-[#E31837]/5 px-2 py-0.5 rounded border border-[#E31837]/10">
              {displayCategory}
            </div>
            <div className="flex text-[#FF9F1C] text-xs gap-0.5">
                {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-stone-200'}`}></i>
                ))}
            </div>
        </div>

        <h3 
          className="font-heading text-lg font-bold text-[#292524] mb-2 leading-tight cursor-pointer hover:text-[#7A1F1F] transition"
          onClick={() => onViewDetails(product)}
        >
          {displayName}
        </h3>
        
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#FF9F1C]/10 group-hover:border-[#FF9F1C]/30 transition-colors duration-300">
          <span className="text-2xl font-heading font-bold text-[#E31837]">₹{product.price.toFixed(0)}</span>
          <button 
            onClick={handleAddToCart}
            className={`
              relative overflow-hidden px-5 py-2.5 rounded-lg shadow-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300
              ${isAdded 
                ? 'bg-[#2ECC71] text-white scale-95 ring-4 ring-[#2ECC71]/20 animate-pulse-green' 
                : 'bg-gradient-to-r from-[#7A1F1F] to-[#E31837] text-white hover:from-[#9b2c2c] hover:to-[#ff4d6d] active:scale-95 hover:shadow-lg hover:shadow-[#E31837]/20'
              }
            `}
          >
            {isAdded ? (
              <>
                <i className="fa-solid fa-check"></i> 
                {language === 'ta' ? 'சேர்த்தாச்சு' : 'Added'}
              </>
            ) : (
              <>
                <i className="fa-solid fa-cart-plus"></i> 
                {language === 'ta' ? 'சேர்' : 'Add'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};