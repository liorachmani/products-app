import { ValidationError } from "yup";

type ErrorTypes = unknown | Error | ValidationError;

/**
 * This function receives an error object and extract the relevant error message
 * @param errorObj the error object received
 * @returns the actual error message
 */
export const extractErrorMessage = (errorObj: ErrorTypes) => {
  let errMsg = "An error occured ";
  if (errorObj instanceof Error || errorObj instanceof ValidationError) {
    errMsg += errorObj.message;
  }

  return errMsg;
};
