export function generateOrderNumber(){
  const last = parseInt(localStorage.getItem('corpatva_last_order_num')||'10240',10);
  const next = last+1;
  localStorage.setItem('corpatva_last_order_num', String(next));
  localStorage.setItem('corpatva_current_order', String(next));
  return next;
}

