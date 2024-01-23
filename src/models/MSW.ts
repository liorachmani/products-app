export interface MSWResponseBody {
  success: boolean;
  text: string;
}

export interface GetProductsParams {
  category?: string;
  filterText?: string;
}
