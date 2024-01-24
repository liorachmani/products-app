import { AgGridReact, AgGridReactProps, AgReactUiProps } from "ag-grid-react";
import { GridOptions } from "ag-grid-community";

const defaultGridOptions: GridOptions = {
  defaultColDef: { flex: 1 },
  rowHeight: 100,
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [10, 20, 50, 100],
  domLayout: "autoHeight",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props extends AgGridReactProps<any>, AgReactUiProps<any> {}

const Table = (props: Props) => {
  return <AgGridReact gridOptions={defaultGridOptions} {...props} />;
};

export { Table };
