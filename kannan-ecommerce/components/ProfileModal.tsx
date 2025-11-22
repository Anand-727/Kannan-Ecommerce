
import React from 'react';
import { Language, Order } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  orders?: Order[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, language, orders = [] }) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#292524]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden relative border border-[#D4AF37]/20 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background */}
        <div className="h-32 bg-[#7A1F1F] relative flex-shrink-0">
           <div className="absolute inset-0 opacity-20 bg-kolam"></div>
           <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-[#F8F5EC] hover:text-white p-2 bg-black/10 rounded-full backdrop-blur-sm transition"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8 -mt-12 relative z-10 flex-grow overflow-y-auto">
          <div className="relative flex justify-between items-end mb-6">
            <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg border-2 border-[#D4AF37]/20">
              <div className="w-full h-full bg-[#F8F5EC] rounded-full flex items-center justify-center text-4xl text-stone-300 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
            <button className="px-4 py-1.5 bg-[#F8F5EC] text-[#7A1F1F] text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-[#7A1F1F] hover:text-white transition border border-[#D4AF37]/20">
               {t.logout} <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-[#7A1F1F]">Anitha Kumar</h2>
            <p className="text-[#0A6847] font-bold text-xs uppercase tracking-wider">Premium Member</p>
          </div>

          <div className="space-y-6">
            {/* Details Section */}
            <div className="bg-[#F8F5EC] rounded-lg p-5 border border-[#D4AF37]/20">
               <h3 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-4">{t.profileTitle}</h3>
               <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-[#0A6847]/10 flex items-center justify-center text-[#0A6847]">
                     <i className="fa-solid fa-phone"></i>
                   </div>
                   <div>
                     <p className="text-xs text-stone-500">{t.profilePhone}</p>
                     <p className="font-medium text-[#292524]">+91 98765 43210</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 text-sm">
                   <div className="w-8 h-8 rounded-full bg-[#0A6847]/10 flex items-center justify-center text-[#0A6847]">
                     <i className="fa-solid fa-envelope"></i>
                   </div>
                   <div>
                     <p className="text-xs text-stone-500">{t.profileEmail}</p>
                     <p className="font-medium text-[#292524]">anitha.k@example.com</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Address Section */}
            <div className="bg-[#F8F5EC] rounded-lg p-5 border border-[#D4AF37]/20">
               <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{t.profileAddress}</h3>
                  <button className="text-[#7A1F1F] text-xs font-bold hover:underline">Edit</button>
               </div>
               <div className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-[#7A1F1F] mt-1"></i>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">
                    Plot No. 42, 2nd Main Road,<br/>
                    Anna Nagar West Extension,<br/>
                    Chennai - 600101, Tamil Nadu.
                  </p>
               </div>
            </div>

            {/* Recent Orders */}
            <div>
               <h3 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-4">{t.profileOrders} ({orders.length})</h3>
               <div className="space-y-3">
                 {orders.length === 0 ? (
                   <div className="text-center py-6 bg-stone-50 rounded-lg border border-dashed border-stone-200">
                      <p className="text-stone-400 text-sm italic">{t.noOrders}</p>
                   </div>
                 ) : (
                   orders.map((order) => (
                     <div key={order.id} className="flex items-center justify-between p-3 border border-[#D4AF37]/20 rounded-lg hover:bg-[#F8F5EC] transition cursor-pointer bg-white shadow-sm">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-[#0A6847]/10 rounded flex items-center justify-center text-[#0A6847] font-bold text-xs flex-col leading-none">
                             <span>{new Date(order.date).getDate()}</span>
                             <span className="text-[8px]">{new Date(order.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                           </div>
                           <div>
                             <p className="text-sm font-bold text-[#7A1F1F] font-heading">{order.id}</p>
                             <div className="flex gap-2 text-xs text-stone-500">
                               <span>{order.items.length} {t.items}</span>
                               <span>•</span>
                               <span>₹{order.total.toFixed(0)}</span>
                             </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="px-2 py-1 bg-[#0A6847]/10 text-[#0A6847] text-[9px] font-bold rounded-full border border-[#0A6847]/20 mb-1">{order.status.toUpperCase()}</span>
                           {order.discount > 0 && (
                             <span className="text-[9px] text-[#0A6847] font-medium">Saved ₹{order.discount.toFixed(0)}</span>
                           )}
                        </div>
                     </div>
                   ))
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
