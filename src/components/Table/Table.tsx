import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Product } from "@src/models";
// import { useAppSelector } from "@src/redux";
// import { selectProducts } from "@src/redux/selectors";
import { ReactNode } from "react";
import "./Table.scss";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { useGetAllProductsQuery } from "@src/redux/api";
import { ErrorComponent, Loading } from "..";

type TableRow = Omit<Product, "image"> & { image: JSX.Element } & {
  actions: ReactNode;
};
type GridColumn = {
  field: keyof TableRow;
  cellRenderer: undefined | (({ value }: { value: ReactNode }) => ReactNode);
};

function Table() {
  // const { products } = useAppSelector(selectProducts);

  const {
    data: products = [],
    error,
    isError,
    isFetching /*isLoading*/,
  } = useGetAllProductsQuery();

  if (isError) return <ErrorComponent error={error} />;
  if (isFetching) return <Loading />;

  const rowsData: TableRow[] = products.map((product) => ({
    ...product,
    image: <Image key={product.id} src={product.image} width="60%" preview />,
    actions: (
      <Dropdown
        key={product.id}
        id={product.id}
        style={{ height: "60%", alignItems: "center" }}
        onChange={(event) => console.log(event)}
        options={["edit", "delete"]}
        placeholder="Action"
        className="rowActions"
      />
    ),
  }));

  const customCellRenderer = ({ value }: { value: ReactNode }) => value;

  const productColumns: GridColumn[] = [
    {
      field: "name",
      cellRenderer: undefined,
    },
    {
      field: "brand",
      cellRenderer: undefined,
    },
    {
      field: "image",
      cellRenderer: customCellRenderer,
    },
    {
      field: "price",
      cellRenderer: undefined,
    },
    {
      field: "id",
      cellRenderer: undefined,
    },
    {
      field: "actions",
      cellRenderer: customCellRenderer,
    },
  ];

  const gridOptions = {
    defaultColDef: { flex: 1 },
    rowHeight: 100,
    // paginationAutoPageSize: true,
    pagination: true,
    paginationPageSize: 10,
  };

  return (
    <div
      id="mainGrid"
      className="ag-theme-quartz"
      style={{ /*width: "80vw",*/ height: "75vh", marginTop: "2vh" }}
    >
      <AgGridReact
        rowData={rowsData}
        columnDefs={productColumns}
        gridOptions={gridOptions}

        // gridOptions={{
        //   defaultColDef: { flex: 1 },
        //   rowHeight: 100,
        //   pagination: true,
        //   paginationPageSize: 10,
        //   // rowStyle: {{}}
        //   // rowClass: "rowClass",
        //   // autoSizeStrategy: { type: "fitCellContents" },
        //   // rowSelection: "single",
        //   // onSelectionChanged(event) {
        //   //   console.log("ROW SELECTED", event.api.getSelectedRows());
        //   // },
        // }}
      ></AgGridReact>
    </div>
  );
}

export default Table;
