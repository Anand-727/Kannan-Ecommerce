import React, { useEffect, useState } from 'react';
import { Product, Language } from '../types';
import { getGeminiRecommendations } from '../services/geminiService';
import { TRANSLATIONS } from '../constants';

interface RecommendationSectionProps {
  cartItems: Product[];
  viewHistory: Product[];
  allProducts: Product[];
  language: Language;
  onAddToCart: (product: Product) => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  cartItems,
  viewHistory,
  allProducts,
  language,
  onAddToCart
}) => {
  const [recommendations, setRecommendations] = useState<{product: Product, reason: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language];
  
  // Debounce the recommendation call
  useEffect(() => {
    if (cartItems.length === 0 && viewHistory.length === 0) return;

    const fetchRecs = async () => {
      setLoading(true);
      try {
        const result = await getGeminiRecommendations(cartItems, viewHistory, allProducts, language);
        
        // Map recommendation IDs back to full product objects
        const recProducts = result.recommendations.map(rec => {
          const product = allProducts.find(p => p.id === rec.productId);
          return product ? { product, reason: rec.reason } : null;
        }).filter((item): item is {product: Product, reason: string} => item !== null);

        setRecommendations(recProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchRecs, 1000); // 1s debounce
    return () => clearTimeout(timer);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, viewHistory.length, language]); // Re-fetch if language changes

  if (recommendations.length === 0 && !loading) return null;

  return (
    <div className="py-12 rounded-2xl my-12 border border-[#FF9F1C]/20 relative overflow-hidden bg-[#FFF9E6]">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF9F1C] to-[#E31837]"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#FF9F1C]/10 rounded-tl-full"></div>
      
      <div className="relative px-6 md:px-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white border border-[#FF9F1C] rounded-full flex items-center justify-center shadow-md text-[#E31837] text-xl">
             <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#7A1F1F]">{t.recommendationTitle}</h2>
            <p className="text-[#E31837] text-sm font-bold uppercase tracking-wider opacity-80">{t.recommendationSub}</p>
          </div>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[1, 2, 3].map(i => (
               <div key={i} className="bg-white p-5 rounded-xl shadow-sm h-72 animate-pulse border border-[#FF9F1C]/10">
                 <div className="w-full h-40 bg-stone-100 rounded-lg mb-4"></div>
                 <div className="h-4 bg-stone-100 rounded w-3/4 mb-2"></div>
                 <div className="h-4 bg-stone-100 rounded w-1/2"></div>
               </div>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(({ product, reason }) => {
              const name = language === 'ta' && product.nameTa ? product.nameTa : product.name;
              return (
                <div key={product.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#FF9F1C]/10 flex flex-col hover:shadow-lg hover:border-[#FF9F1C]/30 transition duration-300 group">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-[#FFFDF5] p-2 border border-stone-100">
                     <img src={product.image} alt={name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition duration-500" />
                  </div>
                  <h3 className="font-heading font-bold text-[#292524] mb-1 line-clamp-1 text-lg group-hover:text-[#E31837] transition">{name}</h3>
                  <p className="text-xs text-stone-600 font-medium mb-4 bg-[#FFF9E6] p-3 rounded-lg border border-[#FF9F1C]/20 italic leading-relaxed">
                    <i className="fa-solid fa-quote-left text-[#FF9F1C] mr-2"></i>
                    {reason}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-stone-100">
                    <span className="font-heading font-bold text-[#E31837] text-xl">₹{product.price.toFixed(0)}</span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="text-[10px] uppercase tracking-widest font-bold bg-white text-[#7A1F1F] border border-[#7A1F1F]/20 px-4 py-2 rounded-full hover:bg-[#7A1F1F] hover:text-white transition shadow-sm"
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};