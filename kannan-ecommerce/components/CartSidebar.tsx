
import React from 'react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  language,
  onRemove, 
  onUpdateQuantity,
  onCheckout 
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

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/50">
            <h2 className="text-xl font-bold text-emerald-950">{t.cartTitle} ({items.length})</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-200">
                  <i className="fa-solid fa-basket-shopping text-3xl"></i>
                </div>
                <p className="text-slate-500 font-medium">{t.emptyCart}</p>
                <button 
                  onClick={onClose}
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                 const name = language === 'ta' && item.nameTa ? item.nameTa : item.name;
                 const cat = language === 'ta' && item.categoryTa ? item.categoryTa : item.category;
                 
                 return (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-white border border-slate-100 rounded-lg overflow-hidden p-2">
                      <img src={item.image} alt={name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800 line-clamp-2 text-sm">{name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{cat}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-50 rounded-l-lg transition"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2 text-sm font-medium text-slate-800">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-50 rounded-r-lg transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-slate-300 hover:text-red-500 transition"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 p-6 bg-slate-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>{t.subtotal}</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-[#0A6847] font-medium">
                    <span>{t.bulkDiscount} ({discountRate * 100}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {discountRate === 0 && (
                   <div className="text-xs text-[#D4AF37] bg-[#D4AF37]/10 p-2 rounded border border-[#D4AF37]/20 text-center">
                      {t.addMoreForDiscount}
                   </div>
                )}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-900 font-bold">{t.cartTotal}</span>
                <span className="text-xl font-bold text-[#7A1F1F]">₹{total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-400 mb-6 text-center">{t.shippingCalc}</p>
              <button 
                onClick={onCheckout}
                className="w-full bg-[#7A1F1F] text-white py-4 rounded-xl font-bold hover:bg-[#5c1717] transition-colors shadow-lg"
              >
                {t.checkoutBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
