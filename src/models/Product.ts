type Brand = "Nike" | "Adidas" | "Under Armour" | "Puma";

export interface Product {
  name: string;
  brand: Brand;
  image: string;
  price: number;
  id: string;
}
