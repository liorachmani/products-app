import { delay, http, HttpResponse } from "msw";
import { ENDPOINTS, OPERATIONS, Product } from "@src/models";
import { productsData } from "@mocks/data";

type ResponseBody = {
  success: boolean;
  text: string;
};

export const handlers = [
  http.get(ENDPOINTS.PRODUCTS, async () => {
    await delay(3000);
    return HttpResponse.json<Product[]>(productsData);
  }),
  http.post(`${ENDPOINTS.PRODUCTS}${OPERATIONS.ADD}`, async ({ request }) => {
    await delay(2000);

    const newProduct = await request.json();
    // eslint-disable-next-line
    productsData.push(newProduct as Product);
    return HttpResponse.json<ResponseBody>({
      success: true,
      text: "Product added",
    });
  }),
];
