import { http, HttpResponse } from "msw";
import { productsData } from ".";
import { ENDPOINTS, Product } from "@src/models";

export const handlers = [
  http.get(ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json<Product[]>(productsData);
  }),
];
