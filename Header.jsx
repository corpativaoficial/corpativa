import logo from '../assets/corpativa_logo_white_transparent.png'

export default function Header({ cartCount, navigate, cartRef }){
  const items = [
    { id:'home', label:'INICIO' },
    { id:'shop', label:'LOJA' },
    { id:'masculino', label:'MASCULINO' },
    { id:'feminino', label:'FEMININO' },
    { id:'ofertas', label:'OFERTAS' },
  ];
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-[#222] h-[64px] flex items-center justify-between px-6 lg:px-10">
      <button onClick={()=>navigate('home')} className="flex items-center gap-3">
        <img src={logo} alt="CORPATIVA" className="h-[28px] w-auto" />
      </button>
      <nav className="hidden lg:flex gap-8">
        {items.map(i=>(
          <button key={i.id} onClick={()=>navigate(i.id)} className="text-[11px] tracking-[.18em] font-bold hover:text-[#b5b5b5] transition">
            {i.label}
          </button>
        ))}
      </nav>
      <button ref={cartRef} id="cartIcon" onClick={()=>navigate('cart')} className="relative w-10 h-10 grid place-items-center border border-[#262626] rounded-full hover:border-white transition">
        <span className="text-[14px]">🛒</span>
        {cartCount>0 && <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-[18px] h-[18px] rounded-full grid place-items-center">{cartCount}</span>}
      </button>
    </header>
  )
}

