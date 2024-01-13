import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PREFIX } from "@src/models";
import { RTK_TAGS } from "@src/models";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_PREFIX }),
  tagTypes: [RTK_TAGS.PRODUCT_TAG],
  endpoints: () => ({}),
});
