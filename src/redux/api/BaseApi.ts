import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_PREFIX = "/api";

export enum RTK_TAGS {
  PRODUCT_TAG = "Product",
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_PREFIX }),
  tagTypes: [RTK_TAGS.PRODUCT_TAG],
  endpoints: () => ({}),
});
