import {
  MSWResponseBody,
  OPERATIONS,
  PRODUCS_PREFIX,
  Product,
} from "@src/models";
import { baseApi } from "@redux/api";
import { RTK_TAGS } from "@src/models";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => PRODUCS_PREFIX,
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
