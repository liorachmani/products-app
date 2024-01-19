export type MSWResponseBody = {
  success: boolean;
  text: string;
};

export type GetProductsParams = { category?: string; filterText?: string };
