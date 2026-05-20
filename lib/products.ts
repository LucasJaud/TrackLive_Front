export type Category = "Todos" | "Calçados" | "Vestuário" | "Equipamentos" | "Acessórios" | "Tecnologia";

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: Exclude<Category, "Todos">;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tênis Speed Pro X1",
    price: 349.90,
    oldPrice: 499.90,
    category: "Calçados",
    image: "👟",
    badge: "OFERTA",
    rating: 5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Camiseta Dry Fit Performance",
    price: 89.90,
    category: "Vestuário",
    image: "👕",
    rating: 4,
    reviews: 74,
  },
  {
    id: 3,
    name: "Bicicleta Speed Carbon 21v",
    price: 2899.90,
    oldPrice: 3499.90,
    category: "Equipamentos",
    image: "🚴",
    badge: "DESTAQUE",
    rating: 5,
    reviews: 43,
  },
  {
    id: 4,
    name: "Halteres Emborrachados 10kg",
    price: 159.90,
    category: "Equipamentos",
    image: "🏋️",
    rating: 4,
    reviews: 91,
  },
  {
    id: 5,
    name: "Óculos de Natação Pro",
    price: 79.90,
    category: "Acessórios",
    image: "🥽",
    rating: 4,
    reviews: 56,
  },
  {
    id: 6,
    name: "Luvas de Boxe Training",
    price: 129.90,
    category: "Acessórios",
    image: "🥊",
    badge: "NOVO",
    rating: 5,
    reviews: 32,
  },
  {
    id: 7,
    name: "Joelheira de Compressão",
    price: 59.90,
    category: "Acessórios",
    image: "🦵",
    rating: 4,
    reviews: 88,
  },
  {
    id: 8,
    name: "Garrafa Térmica 750ml",
    price: 49.90,
    category: "Acessórios",
    image: "🍶",
    rating: 4,
    reviews: 210,
  },
  {
    id: 9,
    name: "Smartwatch Sport Track",
    price: 899.90,
    oldPrice: 1199.90,
    category: "Tecnologia",
    image: "⌚",
    badge: "HOT",
    rating: 5,
    reviews: 67,
  },
];

export const categories: Category[] = ["Todos", "Calçados", "Vestuário", "Equipamentos", "Acessórios", "Tecnologia"];

export function getCategoryCount(cat: Category): number {
  if (cat === "Todos") return products.length;
  return products.filter(p => p.category === cat).length;
}
