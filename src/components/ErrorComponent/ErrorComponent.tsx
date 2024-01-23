import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Props {
  error: FetchBaseQueryError | SerializedError;
}

const ErrorComponent = (props: Props) => {
  const { error } = props;
  let errorMsg: string | undefined;

  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    errorMsg = error.data as string;
  } else {
    errorMsg = error.message;
    // you can access all properties of `SerializedError` here
  }

  return (
    <div style={{ textAlign: "center", color: "red", marginTop: "10%" }}>
      {errorMsg}
    </div>
  );
};

export { ErrorComponent };
