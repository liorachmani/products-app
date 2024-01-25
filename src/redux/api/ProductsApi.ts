import { MSWResponseBody, Product } from "@src/models";
import { RTK_TAGS, baseApi } from "@redux/api";
import { OPERATIONS } from "@src/types";
import { ProductsSearch } from "@src/components";

export const PRODUCS_PREFIX = "/products";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], ProductsSearch>({
      query: (filterParams) => {
        const { category = "", filterText = "" } = filterParams;
        return {
          url: PRODUCS_PREFIX,
          params: { category, filterText },
        };
      },
      providesTags: [RTK_TAGS.PRODUCT_TAG],
    }),
    deleteProduct: builder.mutation<MSWResponseBody, string>({
      query: (idToDelete) => ({
        url: `${PRODUCS_PREFIX}${OPERATIONS.DELETE}`,
        method: "DELETE",
        body: { id: idToDelete },
      }),
      invalidatesTags: [RTK_TAGS.PRODUCT_TAG],
    }),
    addNewProduct: builder.mutation<MSWResponseBody, Product>({
      query: (newProduct) => ({
        url: `${PRODUCS_PREFIX}${OPERATIONS.ADD}`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [RTK_TAGS.PRODUCT_TAG],
    }),
    editProduct: builder.mutation<MSWResponseBody, Product & { oldId: string }>(
      {
        query: (editedProduct) => ({
          url: `${PRODUCS_PREFIX}${OPERATIONS.UPDATE}`,
          method: "PUT",
          body: editedProduct,
        }),
        invalidatesTags: [RTK_TAGS.PRODUCT_TAG],
      }
    ),
  }),
});

export const {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useAddNewProductMutation,
  useEditProductMutation,
} = productsApi;
