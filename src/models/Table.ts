import { ReactNode } from "react";
import { Product } from ".";

export type TableRow = Omit<Product, "image"> & { image: JSX.Element } & {
  actions: ReactNode;
};

export type GridColumn<T> = {
  field: keyof T;
  cellRenderer: undefined | (({ value }: { value: ReactNode }) => ReactNode);
};
