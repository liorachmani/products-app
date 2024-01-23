import { Product } from ".";

export interface Search {
  filterText: string;
  category: keyof Product | "";
}
