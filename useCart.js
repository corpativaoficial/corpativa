import { useState, useEffect } from 'react'

export function useCart(){
  const [cart,setCart]=useState(()=>{
    try{ return JSON.parse(localStorage.getItem('corpatva_cart')||'[]'); }catch{ return []; }
  });

  useEffect(()=>{ localStorage.setItem('corpatva_cart', JSON.stringify(cart)); },[cart]);

  const add=(product, variant, qty=1)=>{
    const key = `${product.id}-${variant?.color||''}-${variant?.size||''}`;
    const idx = cart.findIndex(c=>c.key===key);
    if(idx>=0){
      const copy=[...cart];
      copy[idx].qty+=qty;
      setCart(copy);
    } else {
      setCart([...cart,{
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: variant?.color,
        size: variant?.size,
        qty
      }]);
    }
  };

  const inc=(i)=>{
    const c=[...cart];
    c[i].qty++;
    setCart(c);
  };

  const dec=(i)=>{
    const c=[...cart];
    if(c[i].qty<=1) c.splice(i,1);
    else c[i].qty--;
    setCart(c);
  };

  const clear=()=>setCart([]);

  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  return { cart, add, inc, dec, clear, subtotal, count, setCart };
}

