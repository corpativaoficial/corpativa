import { normalizeCPF } from './validation.js'

export const COUPONS = [
  {
    code: 'BOASVINDAS15',
    discount_percentage: 15,
    type: 'primeira_compra',
    active: true,
    usage_limit: null,
    usage_limit_per_customer: 1,
    description: 'Cupom de boas-vindas 15% OFF',
    expires_at: null
  },
  {
    code: 'MATEUS10',
    discount_percentage: 10,
    type: 'geral',
    active: true,
    usage_limit: null,
    usage_limit_per_customer: null,
    description: '10% OFF - cupom independente',
    expires_at: null
  },
  {
    code: 'FRETEGRATIS',
    discount_percentage: 0,
    type: 'frete',
    active: true,
    usage_limit: null,
    usage_limit_per_customer: null,
    description: 'Frete Grátis',
    expires_at: null,
    free_shipping: true
  }
];

export function findCoupon(code){
  return COUPONS.find(c=>c.code===code?.trim().toUpperCase());
}

export function checkCouponUsable(coupon, cpfRaw){
  const normalized = normalizeCPF(cpfRaw||'');
  if(coupon.usage_limit_per_customer){
    if(!normalized || normalized.length<11) return { ok:false, error:'Informe seu CPF para validar este cupom.' };
    const usages = JSON.parse(localStorage.getItem('corpatva_coupon_usages')||'[]');
    const count = usages.filter(u=>u.coupon_code===coupon.code && u.customer_cpf===normalized).length;
    if(count>=coupon.usage_limit_per_customer){
      if(coupon.code==='BOASVINDAS15') return { ok:false, error:'Este cupom de boas-vindas já foi utilizado.' };
      return { ok:false, error:'Você já atingiu o limite de uso deste cupom.' };
    }
  }
  if(!coupon.active) return { ok:false, error:'Cupom inválido ou indisponível.' };
  if(coupon.expires_at && new Date()>new Date(coupon.expires_at)) return { ok:false, error:'Cupom expirado.' };
  return { ok:true };
}

export function registerCouponUsage({coupon, cpf, orderNumber}){
  const usages = JSON.parse(localStorage.getItem('corpatva_coupon_usages')||'[]');
  usages.push({
    id: Date.now(),
    coupon_code: coupon.code,
    customer_cpf: normalizeCPF(cpf),
    order_id: orderNumber,
    used_at: new Date().toISOString(),
    discount_percentage: coupon.discount_percentage
  });
  localStorage.setItem('corpatva_coupon_usages', JSON.stringify(usages));
}

