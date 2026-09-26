export default function Footer(){
  return (
    <footer className="border-t border-[#111] mt-20">
      <div className="px-6 lg:px-10 py-12 grid lg:grid-cols-3 gap-8 text-[11px] uppercase tracking-[.12em] text-[#a3a3a3]">
        <div>
          <div className="font-black text-white mb-3">CORPATIVA</div>
          <div>contato@corpativa.com<br/>São Paulo — SP</div>
        </div>
        <div>
          <div className="font-bold text-white mb-3">Institucional</div>
          <div className="space-y-1">
            <div>Loja</div>
            <div>Masculino</div>
            <div>Feminino</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-white mb-3">Ajuda</div>
          <div>Trocas e devoluções<br/>Frete e prazos</div>
        </div>
      </div>
      <div className="border-t border-[#111] px-6 lg:px-10 py-4 flex justify-between text-[10px] tracking-[.18em] text-[#333]">
        <div>© 2026 CORPATIVA</div>
        <div>INÍCIO • LOJA • MASCULINO • FEMININO • OFERTAS</div>
      </div>
    </footer>
  )
}

