import { normalizeCEP } from './validation.js'
export async function fetchAddressByCep(cep){
  const clean = normalizeCEP(cep);
  if(clean.length!==8) throw new Error('CEP invalido');
  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  if(!res.ok) throw new Error('Falha ViaCEP');
  const data = await res.json();
  if(data.erro) throw new Error('CEP nao encontrado');
  return { logradouro: data.logradouro||'', bairro: data.bairro||'', cidade: data.localidade||'', uf: data.uf||'', complemento: data.complemento||'' };
}
export function getRegionByUF(uf){
  const map={ SUDESTE:['SP','RJ','MG','ES'], SUL:['PR','SC','RS'], CENTRO:['DF','GO','MT','MS'], NORDESTE:['BA','SE','AL','PE','PB','RN','CE','PI','MA'], NORTE:['AC','RO','AM','RR','PA','AP','TO'] };
  for(const [k,v] of Object.entries(map)) if(v.includes(uf)) return k;
  return 'BRASIL';
}

