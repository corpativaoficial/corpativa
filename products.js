import banner1 from '../assets/banner_1.webp'
import banner2 from '../assets/banner_2.webp'
import banner3 from '../assets/banner_3.webp'
import banner4 from '../assets/banner_4.webp'

// Mock temporário - substituir por Supabase fetch quando for para produção real
// Estrutura compatível: colors e sizes opcionais - produtos sem variação não exibem seletores
export const PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Performance",
    category: "ROUPAS",
    sport: "Corrida",
    gender: "MASCULINO",
    price: 129.9,
    comparePrice: 189.9,
    images: [banner1, banner2],
    description: "Dry-fit premium com proteção UV50+. Costura flat.",
    colors: [
      { name: "Branco", hex: "#ffffff", sizes: [{ size: "P", stock: 5 }, { size: "M", stock: 0 }, { size: "G", stock: 3 }] },
      { name: "Preto", hex: "#0a0a0a", sizes: [{ size: "P", stock: 10 }, { size: "M", stock: 7 }, { size: "G", stock: 2 }] },
    ],
  },
  {
    id: 2,
    name: "Legging Move",
    category: "ROUPAS",
    sport: "Academia",
    gender: "FEMININO",
    price: 189.9,
    images: [banner2, banner3],
    description: "Alta compressão, cintura alta, bolso lateral.",
    colors: [
      { name: "Preto", hex: "#111111", sizes: [{ size: "P", stock: 8 }, { size: "M", stock: 12 }, { size: "G", stock: 6 }] },
    ],
  },
  {
    id: 3,
    name: "Tênis Runner Pro",
    category: "CALÇADOS",
    sport: "Corrida",
    gender: "MASCULINO",
    price: 459.9,
    comparePrice: 599.9,
    images: [banner3, banner1],
    description: "Amortecimento responsivo, drop 8mm.",
    colors: [
      { name: "Branco", hex: "#ffffff", sizes: [{ size: "40", stock: 5 }, { size: "41", stock: 2 }] },
    ],
  },
  {
    id: 4,
    name: "Bola Pro Football",
    category: "BOLAS",
    sport: "Futebol",
    gender: "UNISSEX",
    price: 199.9,
    images: [banner4, banner1],
    description: "Bola Pro Football oficial.",
    colors: [{ name: "Branco", hex: "#ffffff", sizes: [{ size: "ÚNICO", stock: 15 }] }],
  },
  {
    id: 5,
    name: "Creatina 300g",
    category: "SUPLEMENTOS",
    sport: "Academia",
    gender: "UNISSEX",
    price: 149.9,
    images: [banner1, banner3],
    description: "Monohidratada pura 100% Creapure.",
    stock: 20
  },
  {
    id: 6,
    name: "Top Power Compress",
    category: "ROUPAS",
    sport: "Academia",
    gender: "FEMININO",
    price: 119.9,
    images: [banner2, banner4],
    description: "Suporte alto, tecido duplo.",
    colors: [{ name: "Preto", hex: "#0a0a0a", sizes: [{ size: "P", stock: 7 }, { size: "G", stock: 4 }] }],
  },
  {
    id: 7,
    name: "Chuteira Campo Elite",
    category: "CALÇADOS",
    sport: "Futebol",
    gender: "MASCULINO",
    price: 389.9,
    images: [banner3, banner2],
    description: "Trava mista, cabedal knit.",
    colors: [{ name: "Azul", hex: "#1e40af", sizes: [{ size: "40", stock: 3 }, { size: "42", stock: 2 }] }],
  },
  {
    id: 8,
    name: "Bola Basket Pro 7",
    category: "BOLAS",
    sport: "Basquete",
    gender: "UNISSEX",
    price: 229.9,
    images: [banner4, banner2],
    description: "Bola oficial Basquete.",
    colors: [{ name: "Laranja", hex: "#ea580c", sizes: [{ size: "ÚNICO", stock: 8 }] }],
  }
];

export const SPORTS = ["Corrida","Futebol","Futsal","Basquete","Academia"];
export const CATEGORIES = ["ROUPAS","CALÇADOS","BOLAS","ACESSÓRIOS","SUPLEMENTOS"];

