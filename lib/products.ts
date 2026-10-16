export type WeightOption = 250 | 500 | 1000;

export interface Product {
  id: string;
  name: string;
  shortName: string;
  description: string;
  baseWeight: WeightOption;
  prices: Record<WeightOption, number>;
  accent: string;
  tagline: string;
  image: string;
  veg: boolean;
}

export const WEIGHT_OPTIONS: WeightOption[] = [250, 500, 1000];

export const PRODUCTS: Product[] = [
  {
    id: "shahi-amla-achar",
    name: "Shahi Amla Achar",
    shortName: "Amla",
    description:
      "A delightful traditional amla pickle packed with bold Indian flavours.",
    baseWeight: 250,
    prices: { 250: 75, 500: 150, 1000: 300 },
    accent: "#2f6b3a",
    tagline: "Bold & tangy",
    image: "/images/amla-pickle.png",
    veg: true,
  },
  {
    id: "shahi-murga-achar",
    name: "Shahi Murga Achar",
    shortName: "Murga",
    description:
      "A royal chicken pickle made in traditional homemade style with rich spices.",
    baseWeight: 250,
    prices: { 250: 200, 500: 400, 1000: 800 },
    accent: "#8f2d22",
    tagline: "Royal non-veg",
    image: "/images/murga-pickle.png",
    veg: false,
  },
  {
    id: "shahi-nimbu-achar",
    name: "Shahi Nimbu Achar",
    shortName: "Nimbu",
    description:
      "A tangy and flavourful lemon pickle made for lovers of traditional taste.",
    baseWeight: 250,
    prices: { 250: 110, 500: 220, 1000: 440 },
    accent: "#9a7b1e",
    tagline: "Tangy favourite",
    image: "/images/nimbu-pickle.jpg",
    veg: true,
  },
  {
    id: "shahi-mango-achar",
    name: "Shahi Aam / Mango Achar",
    shortName: "Mango",
    description:
      "Classic homemade mango pickle, made fresh in small batches only after you order.",
    baseWeight: 250,
    prices: { 250: 75, 500: 150, 1000: 300 },
    accent: "#B95736",
    tagline: "Classic homemade",
    image: "",
    veg: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function priceFor(productId: string, weight: WeightOption): number {
  const product = getProduct(productId);
  if (!product) return 0;
  return product.prices[weight] ?? 0;
}

export function formatWeight(weight: WeightOption): string {
  if (weight >= 1000) return "1000 g";
  return `${weight} g`;
}
