type Brand = "Nike" | "Adidas" | "Under Armour" | "Puma";

export interface Product {
  name: string;
  brand: Brand;
  image: string;
  price: number;
  id: string;
}

export const currentAvailableImages = [
  "shirt",
  "pants",
  "socks",
  "shoes",
  "ball",
];
export const currentAvailableBrands: Array<Brand> = [
  "Nike",
  "Adidas",
  "Under Armour",
  "Puma",
];
