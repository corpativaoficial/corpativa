import { useState, useEffect } from 'react'
import { maskCPF, maskCEP, normalizeCEP, maskPhone } from '../utils/validation.js'
import { fetchAddressByCep } from '../utils/viaCep.js'
import { findCoupon, checkCouponUsable, registerCouponUsage } from '../utils/coupons.js'
import { generateOrderNumber } from '../utils/order.js'
import { buildWhatsappLink } from '../utils/whatsapp.js'

const SHIPPING_OPTIONS=[
  { carrier:'Jadlog', days:'5 dias úteis', price:19.90 },
  { carrier:'Correios', days:'3 dias úteis', price:24.90 },
  { carrier:'Express', days:'1 dia útil', price:34.90 },
];

export default function CheckoutView({ cart, subtotal, clearCart, navigate }){
  const [form,setForm]=useState({ nome:'', cpf:'', email:'', phone:'', cep:'', logradouro:'', numero:'', complemento:'', bairro:'', cidade:'', uf:'' });
  const [shipping,setShipping]=useState(null);
  const [showShipping,setShowShipping]=useState(false);
  const [couponInput,setCouponInput]=useState('');
  const [appliedCoupon,setAppliedCoupon]=useState(null);
  const [couponMsg,setCouponMsg]=useState('');
  const [cepMsg,setCepMsg]=useState('');
  const [orderNumber,setOrderNumber]=useState(null);

  useEffect(()=>{
    const c=JSON.parse(localStorage.getItem('corpatva_applied_coupon_checkout')||'null');
    if(c) setAppliedCoupon(c);
  },[]);

  const handleCep=async(v)=>{
    const masked=maskCEP(v);
    setForm(f=>({...f, cep:masked}));
    if(normalizeCEP(masked).length===8){
      setCepMsg('Consultando CEP...');
      try{
        const addr=await fetchAddressByCep(masked);
        setForm(f=>({...f, logradouro:addr.logradouro, bairro:addr.bairro, cidade:addr.cidade, uf:addr.uf, complemento:addr.complemento }));
        setCepMsg('');
        setShowShipping(true);
      }catch(e){ setCepMsg(e.message); setShowShipping(false); }
    }else{ setShowShipping(false); }
  };

  const discount = appliedCoupon ? (appliedCoupon.free_shipping?0: subtotal * (appliedCoupon.discount_percentage/100)) : 0;
  const shippingValue = appliedCoupon?.free_shipping ? 0 : (shipping?.price||0);
  const total = subtotal + shippingValue - discount;

  const applyCoupon=()=>{
    const code=couponInput.trim().toUpperCase();
    if(!code) return;
    if(appliedCoupon && appliedCoupon.code!==code){
      setCouponMsg('Não é possível utilizar dois cupons na mesma compra.');
      return;
    }
    const coupon=findCoupon(code);
    if(!coupon){ setCouponMsg('Cupom inválido ou indisponível.'); return; }
    const check=checkCouponUsable(coupon, form.cpf);
    if(!check.ok){ setCouponMsg(check.error); return; }
    setAppliedCoupon(coupon);
    localStorage.setItem('corpatva_applied_coupon_checkout', JSON.stringify(coupon));
    setCouponMsg(`Cupom aplicado: ${coupon.discount_percentage?coupon.discount_percentage+'% OFF':'Frete Grátis'}`);
  };

  const removeCoupon=()=>{
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponMsg('Cupom removido');
    localStorage.removeItem('corpatva_applied_coupon_checkout');
  };

  const finalize=()=>{
    if(!form.nome||!form.cpf||!form.email||!form.phone||!form.cep||!form.logradouro||!form.numero||!form.bairro||!form.cidade||!form.uf){
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    if(!shipping){ alert('Selecione uma opção de frete'); return; }
    const number=generateOrderNumber();
    setOrderNumber(number);
    if(appliedCoupon){
      registerCouponUsage({coupon:appliedCoupon, cpf:form.cpf, orderNumber:number});
    }
    const order={ number, items:cart, subtotal, shipping:shippingValue, discount, total, coupon:appliedCoupon?.code||null, customer:{nome:form.nome}, address:form };
    const orders=JSON.parse(localStorage.getItem('corpatva_orders')||'[]');
    orders.push(order);
    localStorage.setItem('corpatva_orders', JSON.stringify(orders));
    clearCart();
    localStorage.removeItem('corpatva_applied_coupon_checkout');
    const link=buildWhatsappLink(number);
    window.open(link,'_blank');
  };

  if(orderNumber) return (
    <div className="view-enter px-6 lg:px-10 py-16 max-w-[700px] mx-auto text-center">
      <div className="text-[13px] tracking-[.18em] uppercase text-[#666]">Pedido confirmado</div>
      <div className="mt-3 text-[28px] font-black uppercase">Pedido #{orderNumber}</div>
      <div className="mt-6 text-[12px] text-[#a3a3a3] uppercase">Seu pedido foi registrado. Continue pelo WhatsApp para finalizar.</div>
      <a href={buildWhatsappLink(orderNumber)} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-[56px] px-8 bg-[#25D366] text-black font-black items-center justify-center uppercase text-[12px] tracking-[.16em]">
        Finalizar pelo WhatsApp
      </a>
    </div>
  );

  return (
    <div className="view-enter px-6 lg:px-10 py-10 max-w-[1000px] mx-auto">
      <h1 className="text-[32px] font-black uppercase tracking-[.05em]">Finalize sua compra</h1>
      <p className="mt-2 text-[13px] text-[#b5b5b5]">Confira seus dados e finalize seu pedido.</p>

      <div className="mt-10 grid lg:grid-cols-[1.2fr_.8fr] gap-10">
        <div className="space-y-10">
          <div>
            <h3 className="text-[11px] tracking-[.18em] font-black uppercase mb-4">Dados para a compra</h3>
            <div className="grid gap-3">
              <input value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))} placeholder="Nome completo" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              <input value={form.cpf} onChange={e=>setForm(f=>({...f,cpf:maskCPF(e.target.value)}))} placeholder="CPF" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="E-mail" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
              <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:maskPhone(e.target.value)}))} placeholder="Telefone" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
            </div>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[.18em] font-black uppercase mb-4">Endereço de entrega</h3>
            <div className="grid gap-3">
              <div>
                <input value={form.cep} onChange={e=>handleCep(e.target.value)} placeholder="CEP 00000-000" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
                {cepMsg && <div className="mt-1 text-[11px] text-[#a3a3a3]">{cepMsg}</div>}
              </div>
              {showShipping && (
                <div className="border-t border-[#222] pt-4">
                  <div className="text-[11px] tracking-[.15em] uppercase mb-3 font-bold">Opções de frete</div>
                  <div className="space-y-2">
                    {SHIPPING_OPTIONS.map(o=>(
                      <label key={o.carrier} className={`flex justify-between items-center p-3 border cursor-pointer ${shipping?.carrier===o.carrier?'border-white bg-[#111]':'border-[#333]'}`}>
                        <span className="text-[12px]"><input type="radio" name="ship" checked={shipping?.carrier===o.carrier} onChange={()=>setShipping(o)} className="mr-2" />{o.carrier} — {o.days}</span>
                        <span className="font-bold text-[12px]">R$ {o.price.toFixed(2).replace('.',',')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <input value={form.logradouro} onChange={e=>setForm(f=>({...f,logradouro:e.target.value}))} placeholder="Logradouro" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.numero} onChange={e=>setForm(f=>({...f,numero:e.target.value}))} placeholder="Número" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
                <input value={form.complemento} onChange={e=>setForm(f=>({...f,complemento:e.target.value}))} placeholder="Complemento" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
              </div>
              <input value={form.bairro} onChange={e=>setForm(f=>({...f,bairro:e.target.value}))} placeholder="Bairro" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.cidade} onChange={e=>setForm(f=>({...f,cidade:e.target.value}))} placeholder="Cidade" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] outline-none focus:border-white" />
                <input value={form.uf} onChange={e=>setForm(f=>({...f,uf:e.target.value.toUpperCase()}))} placeholder="Estado" className="h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[.18em] font-black uppercase mb-4">Cupom de desconto</h3>
            <div className="flex gap-2">
              <input value={couponInput} onChange={e=>setCouponInput(e.target.value)} placeholder="Digite seu cupom" className="flex-1 h-[48px] px-4 bg-black border border-[#262626] text-[12px] uppercase outline-none focus:border-white" />
              <button onClick={applyCoupon} className="h-[48px] px-6 bg-white text-black font-black text-[11px] tracking-[.16em] uppercase hover:bg-[#e5e5e5]">Aplicar</button>
              {appliedCoupon && <button onClick={removeCoupon} className="h-[48px] px-4 border border-[#262626] text-[11px] uppercase hover:border-white">Remover</button>}
            </div>
            {couponMsg && <div className="mt-2 text-[11px] uppercase tracking-[.12em]">{couponMsg}</div>}
          </div>
        </div>

        <div className="border border-[#151515] bg-[#0a0a0a] p-6 h-fit">
          <h3 className="text-[11px] tracking-[.18em] font-black uppercase mb-4">Resumo do pedido</h3>
          <div className="space-y-2 text-[12px]">
            {cart.map(it=>(<div key={it.key} className="flex justify-between gap-4"><span className="truncate">{it.name} x{it.qty}</span><span>R$ {(it.price*it.qty).toFixed(2).replace('.',',')}</span></div>))}
            <div className="border-t border-[#222] pt-3 flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2).replace('.',',')}</span></div>
            <div className="flex justify-between"><span>Frete</span><span>{shipping?`R$ ${shippingValue.toFixed(2).replace('.',',')}`:'A calcular'}</span></div>
            {discount>0 && <div className="flex justify-between text-[#22c55e]"><span>Desconto {appliedCoupon?.code}</span><span>- R$ {discount.toFixed(2).replace('.',',')}</span></div>}
            <div className="border-t border-[#222] pt-3 flex justify-between font-black text-[14px]"><span>Total</span><span>R$ {total.toFixed(2).replace('.',',')}</span></div>
          </div>
          <button onClick={finalize} className="mt-6 w-full h-[56px] bg-white text-black font-black uppercase text-[12px] tracking-[.18em] hover:bg-[#e5e5e5]">Confirmar pedido</button>
        </div>
      </div>
    </div>
  )
}

