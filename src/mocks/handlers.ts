import { DefaultBodyType, delay, http, HttpResponse, PathParams } from "msw";
import {
  ENDPOINTS,
  OPERATIONS,
  Product,
  MSWResponseBody,
  GetProductsParams,
} from "@src/models";
import { productsData } from "@mocks/data";

export const handlers = [
  http.get<Required<GetProductsParams>, DefaultBodyType, Product[]>(
    ENDPOINTS.PRODUCTS,
    async ({ request }) => {
      await delay(1000);

      const url = new URL(request.url);

      const searchCategory = url.searchParams.get("category") as keyof Product;
      const filterText = url.searchParams.get("filterText") as string;

      if (!filterText) {
        return HttpResponse.json(productsData);
      }

      const filteredProductsData = productsData.filter((product) =>
        product[searchCategory]
          .toString()
          .toLowerCase()
          .includes(filterText.toLowerCase())
      );

      return HttpResponse.json(filteredProductsData);
    }
  ),
  http.post<PathParams, Product, MSWResponseBody>(
    `${ENDPOINTS.PRODUCTS}${OPERATIONS.ADD}`,
    async ({ request }) => {
      await delay(2000);

      const newProduct = await request.json();
      productsData.unshift(newProduct);
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
  http.put<PathParams, Product & { oldId: string }, MSWResponseBody>(
    `${ENDPOINTS.PRODUCTS}${OPERATIONS.UPDATE}`,
    async ({ request }) => {
      await delay(2000);

      const { oldId, ...updatedFields } = await request.json();
      const productToEditIndex = productsData.findIndex(
        (product) => product.id === oldId
      );

      productsData[productToEditIndex] = {
        // ...productsData[productToEditIndex],
        ...updatedFields,
      };

      return HttpResponse.json({
        success: true,
        text: "Product updated",
      });
    }
  ),
];
