# CORPATIVA - Seu Esporte. Seu Ritmo.

E-commerce preto #000 clean esportivo - versão aprovada pronta para GitHub/Vercel.

## Estrutura

```
corpativa/
├── .gitignore
├── .env.example
├── README.md
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── assets/
    │   ├── banner_1.webp
    │   ├── banner_2.webp
    │   ├── banner_3.webp
    │   ├── banner_4.webp
    │   └── corpativa_logo_white_transparent.png
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   ├── CartView.jsx
    │   ├── CheckoutView.jsx
    │   └── GiftPopup.jsx
    ├── data/
    │   └── products.js
    ├── hooks/
    │   └── useCart.js
    ├── styles/
    │   └── globals.css
    └── utils/
        ├── validation.js
        ├── viaCep.js
        ├── coupons.js
        ├── order.js
        └── whatsapp.js
```

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview
```

## Funcionalidades aprovadas (mantidas)

- Logo CORPATIVA volta para home
- Menu 5 itens: INICIO LOJA MASCULINO FEMININO OFERTAS
- 5 esportes: Corrida, Futebol, Futsal, Basquete, Academia
- Carrinho: apenas botões − e + , − em qty 1 remove
- Checkout: FINALIZE SUA COMPRA + Confira seus dados e finalize seu pedido, campos vazios sem dados fictícios, ViaCEP automático, frete abaixo do CEP (Jadlog 5 dias, Correios 3 dias, Express 1 dia)
- Cupons: BOASVINDAS15 15% uso único por CPF (validado no backend/banco), MATEUS10 10% sem limite por CPF, nunca permite os dois simultaneamente
- Popup presente: caixa abre, SEU PRESENTE É 15% OFF, BOASVINDAS15, COPIAR CUPOM copia real
- WhatsApp: número via VITE_WHATSAPP_NUMBER fallback 5511995152345, mensagem exata Olá! Quero finalizar o pedido #XXXXX.

## Env

Copie `.env.example` para `.env.local` e preencha quando integrar Supabase.

## Deploy Vercel

Framework Vite, build command `npm run build`, output `dist`.

