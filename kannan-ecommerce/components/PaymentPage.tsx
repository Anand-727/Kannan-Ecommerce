
import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface PaymentPageProps {
  items: CartItem[];
  language: Language;
  onBack: () => void;
  onSuccess: (paymentMethod: 'card' | 'upi' | 'cod') => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ items, language, onBack, onSuccess }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const t = TRANSLATIONS[language];

  // Discount Logic (Must match App.tsx logic)
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let discountRate = 0;
  if (totalQty >= 5) discountRate = 0.10;
  else if (totalQty >= 3) discountRate = 0.05;
  
  const discountAmount = subtotal * discountRate;
  const shipping = 40; 
  const grandTotal = subtotal - discountAmount + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(paymentMethod);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in relative bg-chettinad">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 relative z-10">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#7A1F1F] hover:text-white transition text-[#7A1F1F] shadow-sm">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#0A6847] uppercase tracking-widest mb-1">{t.checkoutBtn}</span>
          <h1 className="font-heading text-4xl font-bold text-[#7A1F1F]">{t.checkoutTitle}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            
            {/* Shipping Address */}
            <div className="bg-white p-8 rounded-lg border border-[#D4AF37]/20 shadow-lg relative overflow-hidden">
               <h2 className="font-heading text-2xl font-bold text-[#7A1F1F] mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#7A1F1F] text-[#F8F5EC] text-sm font-bold flex items-center justify-center">1</span>
                {t.shippingDetails}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" className="w-full p-4 bg-[#F8F5EC] border border-[#D4AF37]/20 rounded-md focus:bg-white focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none transition font-medium text-stone-800" placeholder="Anitha Kumar" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Address Line 1</label>
                  <input type="text" className="w-full p-4 bg-[#F8F5EC] border border-[#D4AF37]/20 rounded-md focus:bg-white focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none transition font-medium text-stone-800" placeholder="Flat No, Building" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">City</label>
                  <input type="text" className="w-full p-4 bg-[#F8F5EC] border border-[#D4AF37]/20 rounded-md focus:bg-white focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none transition font-medium text-stone-800" placeholder="Chennai" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Pincode</label>
                  <input type="text" className="w-full p-4 bg-[#F8F5EC] border border-[#D4AF37]/20 rounded-md focus:bg-white focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none transition font-medium text-stone-800" placeholder="600 001" required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-lg border border-[#D4AF37]/20 shadow-lg mt-8">
              <h2 className="font-heading text-2xl font-bold text-[#7A1F1F] mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#7A1F1F] text-[#F8F5EC] text-sm font-bold flex items-center justify-center">2</span>
                {t.paymentMethod}
              </h2>
              
              <div className="space-y-5">
                
                {/* Card Option */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`border rounded-md p-5 flex items-center gap-5 cursor-pointer transition-all duration-300 group ${
                    paymentMethod === 'card' 
                    ? 'border-[#7A1F1F] bg-[#7A1F1F]/5' 
                    : 'border-[#D4AF37]/20 hover:bg-[#F8F5EC]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-[#7A1F1F]' : 'border-stone-300'}`}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#7A1F1F]"></div>}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-colors shadow-sm ${
                    paymentMethod === 'card' ? 'bg-[#7A1F1F] text-[#F8F5EC]' : 'bg-[#F8F5EC] text-stone-400 group-hover:bg-white'
                  }`}>
                    <i className="fa-regular fa-credit-card"></i>
                  </div>

                  <div className="flex-1">
                    <p className={`font-heading font-bold text-lg ${paymentMethod === 'card' ? 'text-[#7A1F1F]' : 'text-stone-700'}`}>{t.paymentCard}</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{t.paymentCardDesc}</p>
                  </div>
                  <div className="flex gap-2 text-stone-400 text-2xl opacity-80">
                    <i className="fa-brands fa-cc-visa text-blue-900"></i>
                    <i className="fa-brands fa-cc-mastercard text-red-600"></i>
                  </div>
                </div>

                {/* Card Inputs */}
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-4 pl-0 md:pl-[5.5rem] animate-fade-in">
                    <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 bg-white border border-[#D4AF37]/30 rounded-md focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none font-mono text-stone-800" required />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM / YY" className="w-full p-4 bg-white border border-[#D4AF37]/30 rounded-md focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none font-mono text-stone-800" required />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">CVC</label>
                        <input type="text" placeholder="123" className="w-full p-4 bg-white border border-[#D4AF37]/30 rounded-md focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none font-mono text-stone-800" required />
                    </div>
                  </div>
                )}

                {/* UPI Option */}
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={`border rounded-md p-5 flex items-center gap-5 cursor-pointer transition-all duration-300 group ${
                    paymentMethod === 'upi' 
                    ? 'border-[#7A1F1F] bg-[#7A1F1F]/5' 
                    : 'border-[#D4AF37]/20 hover:bg-[#F8F5EC]'
                  }`}
                >
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'upi' ? 'border-[#7A1F1F]' : 'border-stone-300'}`}>
                    {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#7A1F1F]"></div>}
                  </div>

                   {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-colors shadow-sm ${
                    paymentMethod === 'upi' ? 'bg-[#7A1F1F] text-[#F8F5EC]' : 'bg-[#F8F5EC] text-stone-400 group-hover:bg-white'
                  }`}>
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>

                   <div className="flex-1">
                      <p className={`font-heading font-bold text-lg ${paymentMethod === 'upi' ? 'text-[#7A1F1F]' : 'text-stone-700'}`}>{t.paymentUPI}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{t.paymentUPIDesc}</p>
                   </div>
                   <i className="fa-brands fa-google-pay text-stone-600 text-2xl"></i>
                </div>

                 {/* UPI Input */}
                 {paymentMethod === 'upi' && (
                  <div className="pl-0 md:pl-[5.5rem] animate-fade-in">
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">UPI ID</label>
                    <div className="relative">
                        <input type="text" placeholder="username@okicici" className="w-full p-4 bg-white border border-[#D4AF37]/30 rounded-md focus:border-[#7A1F1F] focus:ring-1 focus:ring-[#7A1F1F] outline-none font-medium text-stone-800" required />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A6847] text-[10px] font-bold bg-[#0A6847]/10 px-2 py-1 rounded">VERIFY</div>
                    </div>
                  </div>
                )}
                
                {/* COD Option */}
                <div 
                   onClick={() => setPaymentMethod('cod')}
                   className={`border rounded-md p-5 flex items-center gap-5 cursor-pointer transition-all duration-300 group ${
                    paymentMethod === 'cod' 
                    ? 'border-[#7A1F1F] bg-[#7A1F1F]/5' 
                    : 'border-[#D4AF37]/20 hover:bg-[#F8F5EC]'
                  }`}
                >
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-[#7A1F1F]' : 'border-stone-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#7A1F1F]"></div>}
                   </div>

                   {/* Icon */}
                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-colors shadow-sm ${
                    paymentMethod === 'cod' ? 'bg-[#7A1F1F] text-[#F8F5EC]' : 'bg-[#F8F5EC] text-stone-400 group-hover:bg-white'
                  }`}>
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>

                   <div className="flex-1">
                       <p className={`font-heading font-bold text-lg ${paymentMethod === 'cod' ? 'text-[#7A1F1F]' : 'text-stone-700'}`}>{t.paymentCOD}</p>
                       <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{t.paymentCODDesc}</p>
                   </div>
                   <i className="fa-solid fa-money-bill-wave text-[#0A6847] text-2xl opacity-80"></i>
                </div>
                
                {paymentMethod === 'cod' && (
                    <div className="pl-0 md:pl-[5.5rem] animate-fade-in">
                        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-md p-4 flex items-start gap-3">
                            <i className="fa-solid fa-circle-info text-[#D4AF37] mt-0.5"></i>
                            <p className="text-sm text-[#7A1F1F] leading-relaxed font-medium">
                                {language === 'ta' 
                                    ? 'கூடுதல் கட்டணம் இல்லை. டெலிவரி செய்யும் போது பணம் செலுத்தவும்.' 
                                    : 'No extra charges. Please pay cash to the delivery agent upon receiving your order.'}
                            </p>
                        </div>
                    </div>
                )}

              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-lg border border-[#D4AF37]/30 shadow-xl sticky top-24 relative overflow-hidden">
            {/* Banana Leaf Texture hint */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0A6847]"></div>

            <h3 className="font-heading text-2xl font-bold text-[#7A1F1F] mb-6 pb-4 border-b border-[#F8F5EC]">{t.orderSummary}</h3>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm items-start group">
                  <span className="text-stone-600 w-2/3 leading-snug font-medium group-hover:text-[#7A1F1F] transition">{item.quantity}x {language === 'ta' && item.nameTa ? item.nameTa : item.name}</span>
                  <span className="font-bold text-[#292524] font-heading">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-[#F8F5EC] rounded-md p-4 space-y-3 mb-8 border border-[#D4AF37]/10">
               <div className="flex justify-between text-stone-500 text-sm">
                 <span>Subtotal</span>
                 <span className="font-medium text-[#292524]">₹{subtotal.toFixed(2)}</span>
               </div>
               {discountAmount > 0 && (
                 <div className="flex justify-between text-[#0A6847] text-sm font-medium">
                   <span>{t.bulkDiscount}</span>
                   <span>-₹{discountAmount.toFixed(2)}</span>
                 </div>
               )}
               <div className="flex justify-between text-stone-500 text-sm">
                 <span>Shipping</span>
                 <span className="font-medium text-[#292524]">₹{shipping.toFixed(2)}</span>
               </div>
               <div className="h-px bg-[#D4AF37]/30 my-2"></div>
               <div className="flex justify-between text-2xl font-heading font-bold text-[#7A1F1F]">
                 <span>Total</span>
                 <span>₹{grandTotal.toFixed(2)}</span>
               </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={processing}
              className="w-full bg-[#7A1F1F] text-[#F8F5EC] py-4 rounded-md font-bold font-heading hover:bg-[#5c1717] transition-all shadow-lg flex justify-center items-center gap-3 uppercase tracking-widest text-sm"
            >
              {processing ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> {t.processing}
                </>
              ) : (
                <>
                  {t.placeOrder} <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>
            
            <div className="mt-6 text-center">
               <p className="text-[10px] text-[#0A6847] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                 <i className="fa-solid fa-lock"></i> 100% Secure Payment
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
