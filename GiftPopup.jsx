import { useState } from 'react'
import { maskCPF, validateCPF, normalizeCPF } from '../utils/validation.js'

export default function GiftPopup({ open, onClose }){
  const [phase,setPhase]=useState('form');
  const [data,setData]=useState({nome:'',email:'',cpf:''});
  const [errors,setErrors]=useState({});
  const [shake,setShake]=useState(false);
  const [copied,setCopied]=useState(false);

  if(!open) return null;

  const submit=()=>{
    const e={};
    if(!data.nome.trim()) e.nome='Informe nome';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email='E-mail inválido';
    if(!validateCPF(data.cpf)) e.cpf='CPF inválido';
    if(Object.keys(e).length){ setErrors(e); setShake(true); setTimeout(()=>setShake(false),500); return; }
    localStorage.setItem('corpatva_customer', JSON.stringify({nome:data.nome,email:data.email,cpf:normalizeCPF(data.cpf)}));
    setPhase('opening');
    setTimeout(()=>setPhase('revealed'), 900);
  };

  const copy=async()=>{
    try{ await navigator.clipboard.writeText('BOASVINDAS15'); }
    catch{
      const ta=document.createElement('textarea');
      ta.value='BOASVINDAS15';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  };

  const sportObjs=[{icon:'🏃',label:'Corrida',x:'-46px'},{icon:'⚽',label:'Futebol',x:'-22px'},{icon:'🏀',label:'Basquete',x:'2px'},{icon:'🏋️',label:'Academia',x:'24px'}];

  return (
    <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-[10px] flex items-center justify-center p-4">
      <div className="modal-enter w-full max-w-[460px] bg-[#0a0a0a] border border-[#262626] p-8 lg:p-10 relative">
        <div className="flex justify-between">
          <div className="text-[11px] tracking-[.3em] font-black">15% OFF</div>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-[#262626]">✕</button>
        </div>
        <div className="mt-8 mb-6 relative">
          <div className={`gift-box ${phase!=='form'?'open':''} ${shake?'shake':''}`}>
            <div className="lid"></div>
            <div className="body"></div>
            {phase!=='form' && sportObjs.map((o,i)=>(<div key={i} className="sport-object animate" style={{'--x':o.x, animationDelay:`${i*80}ms`}}>{o.icon}</div>))}
          </div>
        </div>
        {phase==='form' && (
          <>
            <h3 className="text-[22px] font-black uppercase text-center leading-[0.9]">Um presente pra você<br/>15% OFF na primeira compra</h3>
            <div className="mt-6 space-y-3">
              <input value={data.nome} onChange={e=>setData(d=>({...d,nome:e.target.value}))} placeholder="NOME COMPLETO" className="w-full h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              {errors.nome && <div className="text-[10px] text-red-400 uppercase">{errors.nome}</div>}
              <input value={data.email} onChange={e=>setData(d=>({...d,email:e.target.value}))} placeholder="E-MAIL" className="w-full h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              {errors.email && <div className="text-[10px] text-red-400 uppercase">{errors.email}</div>}
              <input value={data.cpf} onChange={e=>setData(d=>({...d,cpf:maskCPF(e.target.value)}))} placeholder="CPF" className="w-full h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              {errors.cpf && <div className="text-[10px] text-red-400 uppercase">{errors.cpf}</div>}
            </div>
            <button onClick={submit} className="mt-6 w-full h-[56px] bg-white text-black font-black text-[12px] tracking-[.18em] uppercase">Quero meu cupom</button>
            <button onClick={onClose} className="mt-3 w-full h-[44px] border border-[#262626] text-[11px] uppercase text-[#a3a3a3]">Agora não</button>
          </>
        )}
        {phase==='opening' && <div className="text-center py-6 text-[11px] tracking-[.3em] animate-pulse">Abrindo presente...</div>}
        {phase==='revealed' && (
          <div className="text-center">
            <h3 className="text-[24px] font-black uppercase">Seu presente é<br/><span className="text-[#22c55e]">15% OFF</span></h3>
            <div className="mt-6 p-4 bg-black border border-[#262626]">
              <div className="flex justify-between items-center"><span className="text-[11px] tracking-[.18em] text-[#a3a3a3]">Cupom:</span><span className="text-[18px] font-black tracking-[.2em]">BOASVINDAS15</span></div>
              <button onClick={copy} className="mt-4 w-full h-[44px] bg-white text-black font-black text-[11px] uppercase tracking-[.12em]">{copied?'COPIADO ✓':'COPIAR CUPOM'}</button>
            </div>
            <button onClick={onClose} className="mt-6 w-full h-[48px] border border-[#262626] text-[11px] uppercase font-bold">Continuar comprando</button>
          </div>
        )}
      </div>
    </div>
  )
}

