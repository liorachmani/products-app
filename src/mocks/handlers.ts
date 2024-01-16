import { DefaultBodyType, delay, http, HttpResponse, PathParams } from "msw";
import { ENDPOINTS, OPERATIONS, Product, MSWResponseBody } from "@src/models";
import { productsData } from "@mocks/data";

export const handlers = [
  http.get<PathParams, DefaultBodyType, Product[]>(
    ENDPOINTS.PRODUCTS,
    async () => {
      await delay(1000);
      return HttpResponse.json(productsData);
    }
  ),
  http.post<PathParams, Product, MSWResponseBody>(
    `${ENDPOINTS.PRODUCTS}${OPERATIONS.ADD}`,
    async ({ request }) => {
      await delay(2000);

      const newProduct = await request.json();
      // eslint-disable-next-line
      productsData.push(newProduct);
      return HttpResponse.json({
        success: true,
        text: "Product added",
      });
    }
  ),
  http.delete<PathParams, { id: string }, MSWResponseBody>(
    `${ENDPOINTS.PRODUCTS}${OPERATIONS.DELETE}`,
    async ({ request }) => {
      await delay(2000);

      const { id: idToDelete } = await request.json();

      const productToDeleteIndex = productsData.findIndex(
        (product) => product.id === idToDelete
      );
      productsData.splice(productToDeleteIndex, 1);

      return HttpResponse.json({
        success: true,
        text: "Product deleted",
      });
    }
  ),
];
