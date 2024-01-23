import { ValidationError } from "yup";

type ErrorTypes = Error | ValidationError | unknown;

/**
 * This function receives an error object and extract the relevant error message
 * @param errorObj the error object received
 * @returns the actual error message
 */
export function extractErrorMessage(errorObj: ErrorTypes) {
  let errMsg = "An error occured ";
  if (errorObj instanceof Error || errorObj instanceof ValidationError) {
    errMsg += errorObj.message;
  }

  return errMsg;
}
