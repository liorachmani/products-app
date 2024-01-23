import { Product } from ".";

export type Search = {
  filterText: string;
  category: keyof Product | "";
};
