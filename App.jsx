import { useState, useRef } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartView from './components/CartView.jsx'
import CheckoutView from './components/CheckoutView.jsx'
import GiftPopup from './components/GiftPopup.jsx'
import { PRODUCTS } from './data/products.js'
import { useCart } from './hooks/useCart.js'

export default function App(){
  const [view,setView]=useState('home');
  const [selectedProduct,setSelectedProduct]=useState(null);
  const [filter,setFilter]=useState({ sport:null, gender:null, oferta:false });
  const [showGift,setShowGift]=useState(false);
  const cartRef=useRef(null);
  const { cart, add, inc, dec, clear, subtotal, count } = useCart();

  const navigate=(v)=>{
    if(v==='masculino'){ setFilter(f=>({...f, gender:'MASCULINO'})); setView('shop'); return; }
    if(v==='feminino'){ setFilter(f=>({...f, gender:'FEMININO'})); setView('shop'); return; }
    if(v==='ofertas'){ setFilter(f=>({...f, oferta:true})); setView('shop'); return; }
    if(v==='home'){ setFilter({ sport:null, gender:null, oferta:false }); setView('home'); return; }
    setView(v);
  };

  const openProduct=(p)=>{ setSelectedProduct(p); setView('product'); };

  const handleAdd=(product, e)=>{
    if(e){
      const rect = e.currentTarget.getBoundingClientRect();
      const target = document.getElementById('cartIcon')?.getBoundingClientRect();
      if(target){
        const clone = document.createElement('div');
        clone.style.position='fixed'; clone.style.left=rect.left+'px'; clone.style.top=rect.top+'px';
        clone.style.width='80px'; clone.style.height='80px'; clone.style.background=`url(${product.images[0]}) center/cover`;
        clone.style.zIndex=9999; clone.style.borderRadius='6px'; clone.style.transition='transform .7s cubic-bezier(.42,0,.58,1), opacity .3s';
        document.body.appendChild(clone);
        const dx = target.left - rect.left; const dy = target.top - rect.top;
        requestAnimationFrame(()=>{ clone.style.transform=`translate(${dx}px, ${dy}px) scale(0.15)`; clone.style.opacity='0'; });
        setTimeout(()=>clone.remove(), 750);
      }
    }
    add(product, null, 1);
  };

  const handleAddWithVariant=(product)=>{
    add(product, null, 1);
    navigate('cart');
  };

  const filtered = PRODUCTS.filter(p=>{
    if(filter.sport && p.sport!==filter.sport) return false;
    if(filter.gender && p.gender!==filter.gender && p.gender!=='UNISSEX') return false;
    if(filter.oferta && !p.comparePrice) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Header cartCount={count} navigate={navigate} cartRef={cartRef} />

      {view==='home' && (
        <div className="view-enter">
          <div className="px-6 lg:px-10 py-16 lg:py-24">
            <h1 className="text-[42px] lg:text-[72px] font-black uppercase leading-[0.85] tracking-[-0.04em]">Seu esporte.<br/>Seu ritmo.</h1>
            <p className="mt-4 text-[13px] tracking-[.18em] uppercase text-[#a3a3a3]">Encontre seu próximo movimento.</p>
            <button onClick={()=>navigate('shop')} className="mt-8 h-[48px] px-8 bg-white text-black font-black text-[11px] tracking-[.18em] uppercase">Ver coleção</button>
          </div>
          <div className="px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PRODUCTS.slice(0,4).map(p=>(<ProductCard key={p.id} product={p} onOpen={openProduct} onAdd={handleAdd} />))}
          </div>
          <div className="px-6 lg:px-10 mt-8 text-center">
            <button onClick={()=>setShowGift(true)} className="h-[48px] px-8 border border-[#262626] text-[11px] uppercase tracking-[.18em] font-bold hover:border-white transition">Ganhe 15% OFF — Presente</button>
          </div>
        </div>
      )}

      {view==='shop' && (
        <div className="view-enter px-6 lg:px-10 py-10">
          <div className="flex gap-2 flex-wrap mb-6">
            <button onClick={()=>setFilter({})} className="h-8 px-4 border border-[#262626] text-[11px] uppercase hover:border-white">Todos</button>
            {['Corrida','Futebol','Futsal','Basquete','Academia'].map(s=>(<button key={s} onClick={()=>setFilter(f=>({...f, sport:s}))} className="h-8 px-4 border border-[#262626] text-[11px] uppercase hover:border-white">{s}</button>))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {filtered.map(p=>(<ProductCard key={p.id} product={p} onOpen={openProduct} onAdd={handleAdd} />))}
          </div>
        </div>
      )}

      {view==='product' && selectedProduct && (
        <div className="view-enter px-6 lg:px-10 py-10 max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full aspect-[4/5] object-cover bg-[#0a0a0a]" />
            {selectedProduct.images[1] && <img src={selectedProduct.images[1]} alt="" className="w-full aspect-[4/3] object-cover bg-[#0a0a0a]" />}
          </div>
          <div>
            <div className="text-[11px] tracking-[.18em] uppercase text-[#666]">{selectedProduct.sport} • {selectedProduct.category}</div>
            <h1 className="mt-2 text-[28px] font-black uppercase">{selectedProduct.name}</h1>
            <div className="mt-3 font-black text-[20px]">R$ {selectedProduct.price.toFixed(2).replace('.',',')}</div>
            <p className="mt-4 text-[12px] text-[#a3a3a3] leading-[1.6]">{selectedProduct.description}</p>
            {selectedProduct.colors && selectedProduct.colors.length>0 && (
              <div className="mt-6">
                <div className="text-[11px] tracking-[.18em] uppercase font-bold mb-2">Cor</div>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.colors.map(c=>(<div key={c.name} className="h-8 px-3 border border-[#262626] text-[11px] uppercase grid place-items-center">{c.name}</div>))}
                </div>
              </div>
            )}
            <button onClick={()=>handleAddWithVariant(selectedProduct)} className="mt-8 w-full h-[56px] bg-white text-black font-black uppercase text-[12px] tracking-[.18em]">Adicionar ao carrinho</button>
            <button onClick={()=>navigate('shop')} className="mt-3 w-full h-[44px] border border-[#262626] text-[11px] uppercase">Continuar comprando</button>
          </div>
        </div>
      )}

      {view==='cart' && <CartView cart={cart} inc={inc} dec={dec} subtotal={subtotal} navigate={navigate} />}
      {view==='checkout' && <CheckoutView cart={cart} subtotal={subtotal} clearCart={clear} navigate={navigate} />}

      <Footer />
      <GiftPopup open={showGift} onClose={()=>setShowGift(false)} />
    </div>
  )
}

