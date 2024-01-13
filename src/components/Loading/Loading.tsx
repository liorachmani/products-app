import { ProgressSpinner } from "primereact/progressspinner";
import { memo } from "react";

function Loading() {
  return <ProgressSpinner />;
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Loading);
