export const STORE_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '5511995152345';
export function buildWhatsappLink(orderNumber){
  const msg = `Olá! Quero finalizar o pedido #${orderNumber}.`;
  return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

