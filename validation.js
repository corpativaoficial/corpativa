export function normalizeCPF(cpf){ return (cpf||'').replace(/\D/g,''); }
export function maskCPF(v){
  v = v.replace(/\D/g,'').slice(0,11);
  v = v.replace(/(\d{3})(\d)/,'$1.$2');
  v = v.replace(/(\d{3})(\d)/,'$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  return v;
}
export function validateCPF(cpf){
  cpf = normalizeCPF(cpf);
  if(cpf.length!==11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum=0; for(let i=0;i<9;i++) sum+=parseInt(cpf.charAt(i))*(10-i);
  let rev=11-(sum%11); if(rev===10||rev===11) rev=0; if(rev!==parseInt(cpf.charAt(9))) return false;
  sum=0; for(let i=0;i<10;i++) sum+=parseInt(cpf.charAt(i))*(11-i);
  rev=11-(sum%11); if(rev===10||rev===11) rev=0; if(rev!==parseInt(cpf.charAt(10))) return false;
  return true;
}
export function maskCEP(v){
  v=v.replace(/\D/g,'').slice(0,8);
  if(v.length>5) v=v.slice(0,5)+'-'+v.slice(5);
  return v;
}
export function normalizeCEP(c){ return (c||'').replace(/\D/g,''); }
export function maskPhone(v){
  v=v.replace(/\D/g,'').slice(0,11);
  v=v.replace(/(\d{2})(\d)/,'($1) $2');
  v=v.replace(/(\d{5})(\d)/,'$1-$2');
  return v;
}

