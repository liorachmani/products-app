import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const extractReduxHookErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  let errorMsg = "An error occured while fetching data using RTK query ";

  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    errorMsg += error.data as string;
  } else {
    // you can access all properties of `SerializedError` here
    errorMsg += error.message;
  }

  return errorMsg;
};
