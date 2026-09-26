export default function ProductCard({ product, onOpen, onAdd }){
  const img = product.images[0];
  return (
    <div className="group border border-[#151515] bg-[#0a0a0a] p-3">
      <button onClick={()=>onOpen(product)} className="w-full aspect-[3/4] overflow-hidden bg-black">
        <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
      </button>
      <div className="mt-3">
        <div className="text-[10px] tracking-[.14em] text-[#666] uppercase">{product.sport} • {product.category}</div>
        <div className="mt-1 text-[13px] font-bold uppercase tracking-[.02em]">{product.name}</div>
        <div className="mt-1 flex gap-2 items-baseline">
          <span className="font-black">R$ {product.price.toFixed(2).replace('.',',')}</span>
          {product.comparePrice && <span className="text-[11px] line-through text-[#666]">R$ {product.comparePrice.toFixed(2).replace('.',',')}</span>}
        </div>
        <button onClick={(e)=>onAdd(product,e)} className="mt-3 w-full h-[40px] bg-white text-black text-[11px] font-black tracking-[.16em] uppercase hover:bg-[#e5e5e5] transition">
          Adicionar
        </button>
      </div>
    </div>
  )
}

