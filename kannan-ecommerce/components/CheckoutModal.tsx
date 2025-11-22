import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  language: Language;
  onComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total, language, onComplete }) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(3); // Success step
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">{t.checkoutBtn}</h3>
          {step !== 3 && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-times"></i>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-4">
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <p className="text-sm text-slate-500">{t.subtotal}</p>
                   <p className="text-3xl font-bold text-emerald-900">₹{total.toFixed(2)}</p>
                 </div>
                 <div className="flex gap-2">
                    <i className="fa-brands fa-cc-visa text-3xl text-slate-300"></i>
                    <i className="fa-brands fa-cc-mastercard text-3xl text-slate-300"></i>
                 </div>
               </div>

               <div className="space-y-3">
                 <label className="block text-sm font-medium text-slate-700">Card Information</label>
                 <div className="border border-slate-200 rounded-lg overflow-hidden">
                   <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 outline-none border-b border-slate-100" />
                   <div className="flex">
                     <input type="text" placeholder="MM / YY" className="w-1/2 p-3 outline-none border-r border-slate-100" />
                     <input type="text" placeholder="CVC" className="w-1/2 p-3 outline-none" />
                   </div>
                 </div>
                 <input type="text" placeholder={t.cardHolder} className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-emerald-500" />
               </div>

               <button 
                 onClick={handlePay}
                 disabled={processing}
                 className="w-full mt-6 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
               >
                 {processing ? (
                   <>
                     <i className="fa-solid fa-circle-notch fa-spin"></i> {t.processing}
                   </>
                 ) : (
                   <>
                      {t.pay} ₹{total.toFixed(2)}
                   </>
                 )}
               </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-[bounce_1s_infinite]">
                <i className="fa-solid fa-check text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.orderConfirmed}</h2>
              <p className="text-slate-500 mb-8">Order #KAN-{Math.floor(Math.random() * 10000)}</p>
              <button 
                onClick={onComplete}
                className="bg-emerald-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition"
              >
                {t.continueShopping}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};