export type Product = {
  name: string;
  brand: "Nike" | "Adidas" | "Under Armour" | "Puma";
  image: string;
  price: number;
  id: string;
};

export const currentAvailableImages = [
  "shirt",
  "pants",
  "socks",
  "shoes",
  "ball",
];
export const currentAvailableBrands: Array<Product["brand"]> = [
  "Nike",
  "Adidas",
  "Under Armour",
  "Puma",
];
