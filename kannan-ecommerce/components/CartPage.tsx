import React from 'react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CartPageProps {
  items: CartItem[];
  language: Language;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ 
  items, 
  language, 
  onRemove, 
  onUpdateQuantity, 
  onCheckout,
  onContinueShopping
}) => {
  const t = TRANSLATIONS[language];
  
  // Discount Logic
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let discountRate = 0;
  if (totalQty >= 5) discountRate = 0.10;
  else if (totalQty >= 3) discountRate = 0.05;
  
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 animate-fade-in relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-kolam pointer-events-none"></div>

        {/* Manjal Pai Illustration (CSS Only) */}
        <div className="relative w-40 h-48 mb-10 group transition-transform hover:-translate-y-2 duration-500 cursor-pointer" onClick={onContinueShopping}>
           {/* Handles */}
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-24 rounded-full border-4 border-[#E31837] z-0 shadow-inner"></div>
           
           {/* Bag Body */}
           <div className="relative z-10 w-full h-full bg-[#FFC107] rounded-sm shadow-2xl flex flex-col items-center justify-center p-4 border-b-4 border-r-4 border-[#e0a800] transform group-hover:rotate-1 transition-transform duration-300">
              {/* Print on Bag */}
              <div className="border-2 border-[#E31837] rounded-full w-20 h-20 flex items-center justify-center mb-2 opacity-90 bg-white/20 backdrop-blur-sm">
                 <i className="fa-brands fa-pagelines text-3xl text-[#E31837]"></i>
              </div>
              <div className="text-[#7A1F1F] font-heading font-bold text-lg tracking-wider">மஞ்சள் பை</div>
              <div className="text-[#7A1F1F] text-[8px] font-bold tracking-widest uppercase mt-1">Kannan Grocery</div>
              
              {/* Texture/Creases */}
              <div className="absolute top-0 left-3 w-px h-full bg-black/5"></div>
              <div className="absolute top-0 right-3 w-px h-full bg-black/5"></div>
              <div className="absolute bottom-4 w-full h-px bg-black/5"></div>
           </div>
        </div>

        <h2 className="font-heading text-4xl font-bold text-[#7A1F1F] mb-4 drop-shadow-sm">{t.emptyCart}</h2>
        <p className="text-stone-600 mb-10 max-w-md mx-auto text-lg font-light leading-relaxed">
           {language === 'ta' 
             ? 'உங்கள் சமையலறைக்கு தேவையான பொருட்களை மஞ்சள் பையில் நிரப்புங்கள்.' 
             : 'Your traditional Manjal Pai (Yellow Bag) is waiting to be filled with authentic goodies.'}
        </p>
        
        <button 
          onClick={onContinueShopping}
          className="group relative bg-gradient-to-r from-[#7A1F1F] to-[#E31837] text-white px-12 py-4 rounded-full font-bold font-heading overflow-hidden shadow-lg shadow-[#E31837]/30 transition-all duration-300 active:scale-95 hover:from-[#9b2c2c] hover:to-[#ff4d6d]"
        >
          <span className="relative flex items-center gap-3 text-sm tracking-widest uppercase">
             {t.startShopping} <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="font-heading text-4xl font-bold text-[#7A1F1F] mb-10 border-b-2 border-[#FF9F1C]/20 pb-4 inline-block pr-12">{t.yourCart}</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-grow space-y-6">
          {items.map((item) => {
             const name = language === 'ta' && item.nameTa ? item.nameTa : item.name;
             const cat = language === 'ta' && item.categoryTa ? item.categoryTa : item.category;
             return (
               <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-[#FF9F1C]/10 rounded-xl shadow-sm hover:shadow-md transition relative group">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FF9F1C] to-[#E31837] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-24 h-24 flex-shrink-0 bg-[#FFFDF5] rounded-lg overflow-hidden p-2 border border-[#FF9F1C]/10">
                   <img src={item.image} alt={name} className="w-full h-full object-cover mix-blend-multiply" />
                 </div>
                 
                 <div className="flex-grow text-center sm:text-left">
                   <h3 className="font-heading text-xl font-bold text-[#292524] mb-1">{name}</h3>
                   <p className="text-[10px] font-bold text-[#E31837] uppercase tracking-widest mb-3">{cat}</p>
                   <span className="inline-block bg-[#FFFDF5] text-stone-600 text-xs px-2 py-1 rounded border border-[#FF9F1C]/20 font-medium">
                     ₹{item.price} / unit
                   </span>
                 </div>

                 <div className="flex items-center gap-8">
                   <div className="flex items-center border border-[#FF9F1C]/30 rounded-lg bg-white shadow-sm overflow-hidden">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-2 hover:bg-[#FF9F1C]/10 text-[#7A1F1F] transition border-r border-[#FF9F1C]/30"
                        disabled={item.quantity <= 1}
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 text-center font-bold text-[#292524]">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-2 hover:bg-[#FF9F1C]/10 text-[#7A1F1F] transition border-l border-[#FF9F1C]/30"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                   </div>
                   
                   <div className="text-right w-24">
                      <p className="font-heading text-xl font-bold text-[#E31837]">₹{(item.price * item.quantity).toFixed(0)}</p>
                   </div>
                   
                   <button 
                     onClick={() => onRemove(item.id)}
                     className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 hover:bg-[#E31837] text-[#E31837] hover:text-white transition shadow-sm"
                   >
                     <i className="fa-solid fa-trash-can"></i>
                   </button>
                 </div>
               </div>
             );
          })}
          
          <button 
            onClick={onContinueShopping}
            className="flex items-center text-[#7A1F1F] font-bold hover:underline decoration-[#E31837] mt-6 uppercase tracking-wider text-xs"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> {t.continueShopping}
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-white p-8 rounded-2xl border border-[#FF9F1C]/20 shadow-xl sticky top-24 bg-chettinad">
             <h3 className="font-heading text-xl font-bold text-[#7A1F1F] mb-6 flex items-center gap-2">
               {t.cartTotal}
               <div className="flex-grow h-px bg-[#FF9F1C]/30"></div>
             </h3>
             
             <div className="space-y-4 mb-8 pb-8 border-b border-[#FF9F1C]/20 text-sm bg-white/80 p-5 rounded-xl backdrop-blur-sm shadow-sm">
               <div className="flex justify-between text-stone-600">
                 <span>{t.subtotal} ({totalQty} {t.items})</span>
                 <span className="font-medium">₹{subtotal.toFixed(2)}</span>
               </div>
               {discountAmount > 0 && (
                 <div className="flex justify-between text-[#2ECC71]">
                   <span>{t.bulkDiscount} ({discountRate * 100}%)</span>
                   <span>- ₹{discountAmount.toFixed(2)}</span>
                 </div>
               )}
               {discountRate === 0 && (
                 <div className="p-3 bg-[#FF9F1C]/10 border border-[#FF9F1C]/30 rounded-lg text-xs text-center text-[#E31837] font-bold">
                   {t.addMoreForDiscount} (3+ items: 5%, 5+: 10%)
                 </div>
               )}
               <div className="flex justify-between text-stone-600">
                 <span>Shipping</span>
                 <span className="text-[10px] bg-[#E31837]/5 px-2 py-0.5 rounded text-[#E31837] uppercase font-bold tracking-wider border border-[#E31837]/10">Calculated next</span>
               </div>
             </div>

             <div className="flex justify-between items-end mb-8 px-4">
               <span className="text-stone-500 font-medium">Total Amount</span>
               <span className="font-heading text-4xl font-bold text-[#7A1F1F]">₹{total.toFixed(2)}</span>
             </div>

             <button 
               onClick={onCheckout}
               className="w-full bg-gradient-to-r from-[#0A6847] to-[#2ECC71] text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-[#2ECC71]/30 transition flex justify-center items-center gap-3 uppercase tracking-widest text-sm group"
             >
               {t.checkoutBtn} <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
             </button>
             
             <div className="mt-8 pt-6 border-t border-[#FF9F1C]/20 flex items-center justify-center gap-6 text-2xl opacity-80">
               <i className="fa-brands fa-cc-visa text-[#1A1F71] hover:scale-110 transition"></i>
               <i className="fa-brands fa-cc-mastercard text-[#EB001B] hover:scale-110 transition"></i>
               <i className="fa-brands fa-google-pay text-stone-600 hover:scale-110 transition"></i>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};