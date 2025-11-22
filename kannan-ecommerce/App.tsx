import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { RecommendationSection } from './components/RecommendationSection';
import { ProfileModal } from './components/ProfileModal';
import { LoginPage } from './components/LoginPage';
import { CartPage } from './components/CartPage';
import { PaymentPage } from './components/PaymentPage';
import { PRODUCTS, TRANSLATIONS } from './constants';
import { Product, CartItem, ViewState, Language, Order } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewHistory, setViewHistory] = useState<Product[]>([]);
  const [viewState, setViewState] = useState<ViewState>('LOGIN');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [language, setLanguage] = useState<Language>('en');
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [lastOrderId, setLastOrderId] = useState<string>('');

  const t = TRANSLATIONS[language];

  const rawCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));
  const categories = ['All', ...rawCategories];

  // Calculate totals with bulk discount
  const getCartTotals = (items: CartItem[]) => {
    const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discountRate = 0;
    
    // Bulk Discount Logic
    if (totalQty >= 5) discountRate = 0.10; // 10% off for 5+ items
    else if (totalQty >= 3) discountRate = 0.05; // 5% off for 3+ items
    
    const discount = subtotal * discountRate;
    const shipping = 40; // Flat rate
    // If subtotal is 0, shipping is 0
    const finalShipping = subtotal > 0 ? shipping : 0;
    const total = subtotal - discount + finalShipping;
    
    return { subtotal, discount, shipping: finalShipping, total, discountRate, totalQty };
  };

  const { total: cartTotal, totalQty } = getCartTotals(cart);

  // Helper to add to cart
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Helper to remove from cart
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Helper to update quantity
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setViewState('PRODUCT_DETAIL');
    setViewHistory(prev => {
        const filtered = prev.filter(p => p.id !== product.id);
        return [product, ...filtered].slice(0, 5);
    });
    window.scrollTo(0, 0);
  };

  const handleOrderSuccess = (paymentMethod: 'card' | 'upi' | 'cod') => {
    const { subtotal, discount, shipping, total } = getCartTotals(cart);
    const newOrderId = `KAN-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      status: 'Processing',
      paymentMethod
    };
    
    setOrderHistory(prev => [newOrder, ...prev]);
    setLastOrderId(newOrderId);
    setCart([]);
    setViewState('SUCCESS');
  };

  // If state is LOGIN, render only Login Page
  if (viewState === 'LOGIN') {
    return (
      <LoginPage 
        language={language}
        onLogin={() => setViewState('HOME')}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-stone-900">
      <Navbar 
        cartCount={totalQty} 
        onCartClick={() => {
          setViewState('CART');
          window.scrollTo(0,0);
        }}
        onGoHome={() => setViewState('HOME')}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
        onOpenProfile={() => setIsProfileOpen(true)}
      />
      
      <main className="flex-grow w-full">
        
        {viewState === 'HOME' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section - Vibrant Festival Gradient */}
            <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-festival text-white shadow-xl shadow-[#E31837]/20">
               {/* Background Geometry */}
               <div className="absolute inset-0">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                 {/* Decorative Circles */}
                 <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9F1C] rounded-full mix-blend-overlay filter blur-3xl opacity-40 transform translate-x-1/3 -translate-y-1/3"></div>
                 <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7A1F1F] rounded-full mix-blend-overlay filter blur-2xl opacity-60 transform -translate-x-1/4 translate-y-1/4"></div>
                 
                 {/* Pattern */}
                 <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-kolam"></div>
               </div>

               <div className="relative z-10 p-10 md:p-20 max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/30 rounded-full mb-8 backdrop-blur-md shadow-sm">
                    <span className="w-2.5 h-2.5 bg-[#2ECC71] rounded-full animate-pulse shadow-[0_0_10px_#2ECC71]"></span>
                    <span className="text-[#FF9F1C] font-bold tracking-widest text-[10px] uppercase">
                      {language === 'ta' ? 'பாரம்பரிய பண்டிகை சுவை' : 'Authentic Festival Tastes'}
                    </span>
                 </div>
                 <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-md">
                   {t.heroTitle}
                 </h1>
                 <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl font-light leading-relaxed drop-shadow-sm">
                   {t.heroSub}
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => {
                          const el = document.getElementById('shop-content');
                          el?.scrollIntoView({behavior: 'smooth'});
                      }}
                      className="bg-[#FF9F1C] text-[#7A1F1F] px-10 py-4 rounded-full font-heading font-bold hover:bg-white hover:text-[#E31837] transition-all duration-300 shadow-lg shadow-[#7A1F1F]/20 flex items-center gap-3 transform hover:-translate-y-1"
                    >
                      {t.shopNow} <i className="fa-solid fa-arrow-down"></i>
                    </button>
                    <div className="hidden sm:flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full bg-white/5 backdrop-blur-sm">
                        <i className="fa-solid fa-truck-fast text-[#FF9F1C] text-xl"></i>
                        <span className="text-sm font-bold tracking-wider uppercase text-white">Express Delivery</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* AI Recommendations */}
            {viewHistory.length > 0 && (
              <RecommendationSection 
                cartItems={cart} 
                viewHistory={viewHistory} 
                allProducts={PRODUCTS} 
                language={language}
                onAddToCart={addToCart}
              />
            )}

            <div id="shop-content">
              {/* Category Filter - Colorful Chips */}
              <div className="sticky top-20 z-30 bg-[#FFFDF5]/95 backdrop-blur-md py-6 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-[#FF9F1C]/10 mb-12 flex gap-3 overflow-x-auto no-scrollbar">
                {categories.map(cat => {
                  const displayCat = language === 'ta' ? (t.categories as any)[cat] || cat : cat;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-full whitespace-nowrap text-sm font-bold font-heading tracking-wide transition-all duration-300 border ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#E31837] to-[#7A1F1F] text-white border-transparent shadow-lg shadow-[#E31837]/30 transform scale-105' 
                          : 'bg-white text-[#7A1F1F] hover:text-[#E31837] hover:border-[#E31837]/50 border-[#FF9F1C]/30 hover:bg-red-50'
                      }`}
                    >
                      {displayCat}
                    </button>
                  );
                })}
              </div>

              {/* Products */}
              {activeCategory === 'All' ? (
                rawCategories.map((category) => {
                  const categoryProducts = PRODUCTS.filter(p => p.category === category);
                  const displayName = language === 'ta' ? (t.categories as any)[category] || category : category;
                  
                  if (categoryProducts.length === 0) return null;

                  return (
                    <div key={category} className="mb-16">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           {/* Colorful Decorator */}
                           <div className="w-1.5 h-8 bg-gradient-to-b from-[#FF9F1C] to-[#E31837] rounded-full"></div>
                           <h2 className="font-heading text-3xl font-bold text-[#292524] tracking-tight">
                             {displayName}
                           </h2>
                        </div>
                        <button 
                          onClick={() => setActiveCategory(category)}
                          className="text-[#E31837] font-bold text-xs hover:underline flex items-center gap-2 uppercase tracking-wider bg-[#E31837]/5 px-4 py-2 rounded-full hover:bg-[#E31837]/10 transition"
                        >
                          {t.viewAll} <i className="fa-solid fa-chevron-right text-[10px]"></i>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categoryProducts.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            language={language}
                            onAddToCart={addToCart}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-4 mb-10 border-b border-[#FF9F1C]/20 pb-4">
                     <div className="w-3 h-12 bg-gradient-to-b from-[#E31837] to-[#7A1F1F] rounded-r-xl"></div>
                     <h2 className="font-heading text-4xl font-bold text-[#7A1F1F]">
                       {language === 'ta' ? (t.categories as any)[activeCategory] || activeCategory : activeCategory}
                     </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.filter(p => p.category === activeCategory).map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        language={language}
                        onAddToCart={addToCart}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {viewState === 'PRODUCT_DETAIL' && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
            <button 
              onClick={() => setViewState('HOME')}
              className="mb-8 flex items-center text-stone-500 hover:text-[#E31837] transition font-medium gap-2 group"
            >
              <span className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:border-[#E31837] group-hover:bg-[#E31837] group-hover:text-white transition-all">
                 <i className="fa-solid fa-arrow-left"></i>
              </span>
              {t.back}
            </button>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-[#FF9F1C]/5 border border-[#FF9F1C]/20 grid grid-cols-1 md:grid-cols-2 gap-16 relative overflow-hidden">
              {/* Detail Background Pattern */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9F1C]/5 rounded-bl-full z-0 pointer-events-none"></div>

              <div className="bg-[#FFFDF5] rounded-xl overflow-hidden aspect-square flex items-center justify-center p-8 border border-[#FF9F1C]/10 relative z-10">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-lg shadow-lg mix-blend-multiply" />
              </div>
              
              <div className="flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 bg-[#E31837]/10 text-[#E31837] rounded-full text-[11px] font-bold uppercase tracking-widest border border-[#E31837]/20">
                    {language === 'ta' && selectedProduct.categoryTa ? selectedProduct.categoryTa : selectedProduct.category}
                  </span>
                  <div className="flex items-center text-[#FF9F1C] text-sm gap-1 bg-[#FF9F1C]/5 px-2 py-1 rounded-full border border-[#FF9F1C]/20">
                    <i className="fa-solid fa-star"></i>
                    <span className="text-[#7A1F1F] ml-1 font-bold">4.8</span>
                  </div>
                </div>
                
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#292524] mb-6 leading-tight">
                  {language === 'ta' && selectedProduct.nameTa ? selectedProduct.nameTa : selectedProduct.name}
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed mb-10 font-light">
                  {language === 'ta' && selectedProduct.descriptionTa ? selectedProduct.descriptionTa : selectedProduct.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {selectedProduct.tags.map(tag => (
                    <span key={tag} className="text-xs text-[#7A1F1F] bg-white px-4 py-2 rounded-full border border-[#7A1F1F]/10 font-medium shadow-sm hover:bg-[#7A1F1F] hover:text-white transition cursor-default">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-8 mt-auto pt-8 border-t border-[#FF9F1C]/20">
                  <div>
                     <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Price</p>
                     <span className="font-heading text-5xl font-bold text-[#E31837]">₹{selectedProduct.price.toFixed(0)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 bg-gradient-to-r from-[#7A1F1F] to-[#E31837] text-white py-5 rounded-xl font-bold font-heading hover:from-[#9b2c2c] hover:to-[#ff4d6d] transition shadow-lg shadow-[#E31837]/30 uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                  >
                    <i className="fa-solid fa-bag-shopping"></i> {t.addToCart}
                  </button>
                </div>
              </div>
            </div>

            {/* Detail Page Recommendations */}
            <div className="mt-12">
               <RecommendationSection 
                 cartItems={cart} 
                 viewHistory={[selectedProduct]} 
                 allProducts={PRODUCTS} 
                 language={language}
                 onAddToCart={addToCart}
              />
            </div>
          </div>
        )}

        {viewState === 'CART' && (
          <CartPage 
            items={cart}
            language={language}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onCheckout={() => {
               setViewState('CHECKOUT');
               window.scrollTo(0,0);
            }}
            onContinueShopping={() => setViewState('HOME')}
          />
        )}

        {viewState === 'CHECKOUT' && (
          <PaymentPage 
            items={cart}
            language={language}
            onBack={() => setViewState('CART')}
            onSuccess={handleOrderSuccess}
          />
        )}

        {viewState === 'SUCCESS' && (
           <div className="flex items-center justify-center min-h-[70vh] animate-fade-in bg-kolam">
             <div className="text-center p-12 bg-white rounded-2xl shadow-2xl border border-[#FF9F1C]/20 max-w-lg mx-4 relative overflow-hidden">
               <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-[#2ECC71] to-[#0A6847]"></div>
               
               <div className="w-24 h-24 bg-[#2ECC71]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#2ECC71] border-4 border-[#2ECC71]/20 animate-bounce">
                 <i className="fa-solid fa-check text-4xl"></i>
               </div>
               <h2 className="font-heading text-4xl font-bold text-[#0A6847] mb-4">{t.orderConfirmed}</h2>
               <p className="text-stone-500 mb-10 leading-relaxed text-lg">Nandri! Your authentic grocery order has been placed successfully.</p>
               
               <div className="bg-[#FFFDF5] p-6 rounded-xl mb-8 border border-dashed border-[#FF9F1C]/40">
                 <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Order ID</p>
                 <p className="text-3xl font-heading font-bold text-[#7A1F1F] tracking-wider">#{lastOrderId}</p>
               </div>

               <button 
                 onClick={() => setViewState('HOME')}
                 className="bg-gradient-to-r from-[#7A1F1F] to-[#E31837] text-white px-12 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#E31837]/30 transition uppercase tracking-wider text-sm"
               >
                 {t.continueShopping}
               </button>
             </div>
           </div>
        )}

      </main>

      <footer className="bg-[#1a1818] text-white/60 py-16 mt-auto relative overflow-hidden">
         {/* Footer Pattern */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF9F1C] via-[#E31837] to-[#7A1F1F]"></div>
        <div className="absolute inset-0 bg-kolam opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="flex flex-col items-center text-center">
             <div className="w-24 h-24 flex items-center justify-center mb-6 bg-white/5 rounded-full p-4 border border-white/10">
                <img 
                   src="https://imgs.search.brave.com/y_stKpE_8-CCrjLZLrrbenWog-0GSfa4mTrG_TeKKk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzAwLzE3Lzg3/LzM2MF9GXzE2MDAx/Nzg3NTJfdlowcWRx/QjJPWjY0ZmZRTlFZ/T3BhN05HeW5CVTB4/VzcuanBn" 
                   alt="Baby Krishna" 
                   className="w-full h-full object-contain drop-shadow-md" 
                 />
             </div>
             <h2 className="font-heading text-3xl text-white mb-2 tracking-wide">Kannan Grocery</h2>
             <p className="text-[#FF9F1C] text-sm mb-10 font-bold tracking-widest uppercase">Authentic Taste of Tamil Nadu</p>
             
             <div className="flex justify-center gap-8 mb-12">
               <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition duration-300 group">
                 <i className="fa-brands fa-facebook text-xl group-hover:scale-110 transition"></i>
               </a>
               <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition duration-300 group">
                 <i className="fa-brands fa-twitter text-xl group-hover:scale-110 transition"></i>
               </a>
               <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#FD1D1D] hover:to-[#833AB4] hover:text-white transition duration-300 group">
                 <i className="fa-brands fa-instagram text-xl group-hover:scale-110 transition"></i>
               </a>
             </div>
             
             <div className="border-t border-white/10 pt-8 w-full max-w-md">
                <p className="text-xs font-medium opacity-50">© 2024 Kannan Grocery. Crafted with devotion in Chennai.</p>
             </div>
           </div>
        </div>
      </footer>

      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        language={language}
        orders={orderHistory}
      />

    </div>
  );
}