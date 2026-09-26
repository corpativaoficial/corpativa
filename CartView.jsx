export default function CartView({ cart, inc, dec, subtotal, navigate }){
  if(cart.length===0) return (
    <div className="view-enter px-6 lg:px-10 py-20 text-center">
      <div className="text-[13px] uppercase tracking-[.18em] text-[#666]">Seu carrinho está vazio</div>
      <button onClick={()=>navigate('shop')} className="mt-6 h-[48px] px-8 bg-white text-black font-black text-[11px] tracking-[.16em] uppercase">
        Continuar comprando
      </button>
    </div>
  );

  return (
    <div className="view-enter px-6 lg:px-10 py-10 max-w-[900px] mx-auto">
      <h1 className="text-[24px] font-black uppercase">Carrinho</h1>
      <div className="mt-8 space-y-4">
        {cart.map((it,i)=>(
          <div key={it.key} className="flex gap-4 border border-[#151515] p-4 bg-[#0a0a0a]">
            <img src={it.image} alt={it.name} className="w-[88px] h-[88px] object-cover bg-black" />
            <div className="flex-1">
              <div className="text-[13px] font-bold uppercase">{it.name}</div>
              {it.color && <div className="text-[11px] text-[#a3a3a3] uppercase">Cor: {it.color} {it.size?`• Tam: ${it.size}`:''}</div>}
              <div className="mt-3 flex items-center gap-3">
                <button onClick={()=>dec(i)} className="w-8 h-8 border border-[#262626] grid place-items-center hover:border-white transition">−</button>
                <span className="text-[12px] font-bold w-6 text-center">{it.qty}</span>
                <button onClick={()=>inc(i)} className="w-8 h-8 border border-[#262626] grid place-items-center hover:border-white transition">+</button>
                <span className="ml-auto font-black text-[13px]">R$ {(it.price*it.qty).toFixed(2).replace('.',',')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-[#222] pt-6 flex justify-between items-center">
        <span className="text-[11px] tracking-[.18em] uppercase text-[#a3a3a3]">Subtotal</span>
        <span className="font-black">R$ {subtotal.toFixed(2).replace('.',',')}</span>
      </div>
      <button onClick={()=>navigate('checkout')} className="mt-6 w-full h-[56px] bg-white text-black font-black tracking-[.18em] uppercase text-[12px] hover:bg-[#e5e5e5] transition">
        Finalizar compra
      </button>
    </div>
  )
}

