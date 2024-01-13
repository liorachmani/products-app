import { OPERATIONS, PRODUCS_PREFIX, Product } from "@src/models";
import { baseApi } from "@redux/api";
import { RTK_TAGS } from "@src/models";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => PRODUCS_PREFIX,
      providesTags: [RTK_TAGS.PRODUCT_TAG],
    }),
    addNewProduct: builder.mutation<boolean, Product>({
      query: (newProduct) => ({
        url: `${PRODUCS_PREFIX}${OPERATIONS.ADD}`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [RTK_TAGS.PRODUCT_TAG],
    }),
  }),
});

export const { useGetAllProductsQuery, useAddNewProductMutation } = productsApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Product } from "@src/models";

// export const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api/products" }),
//   endpoints: (builder) => ({
//     getAllProducts: builder.query<Product[], void>({
//       query: () => "products",
//     }),
//   }),
// });

// export const { useGetAllProductsQuery } = productsApi;
