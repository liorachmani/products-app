import { AgGridReact } from "ag-grid-react";
import { GridOptions, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Product } from "@src/models";
import { ReactNode } from "react";
import "./Table.scss";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Image } from "primereact/image";
import { useGetAllProductsQuery } from "@src/redux/api";
import { ErrorComponent, Loading } from "@src/components";
import { useModal } from "@src/providers";
import { customCellRenderer } from "@src/utils";
import { assetsPath } from "@src/constants";

type TableRow = Omit<Product, "image"> & { image: JSX.Element } & {
  actions: ReactNode;
};

enum TABLE_ACTIONS {
  EDIT = "edit",
  DELETE = "delete",
}

function Table() {
  const {
    data: products = [],
    error,
    isError,
    isFetching,
  } = useGetAllProductsQuery();

  const { openModal } = useModal();

  if (isError) return <ErrorComponent error={error} />;

  const productColumns: ColDef<TableRow>[] = [
    {
      field: "name",
    },
    {
      field: "brand",
    },
    {
      field: "image",
      cellRenderer: customCellRenderer,
    },
    {
      field: "price",
    },
    {
      field: "id",
    },
    {
      field: "actions",
      cellRenderer: customCellRenderer,
    },
  ];

  const gridOptions: GridOptions = {
    defaultColDef: { flex: 1 },
    rowHeight: 100,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    domLayout: "autoHeight",
    noRowsOverlayComponent: Loading,
  };

  const rowsData: TableRow[] = products.map((product) => ({
    ...product,
    image: (
      <Image
        key={product.id}
        src={`${assetsPath}${product.image}.png`}
        width="60%"
        preview
      />
    ),
    actions: (
      <Dropdown
        key={product.id}
        id={product.id}
        style={{ height: "60%", alignItems: "center" }}
        onChange={handleRowAction}
        options={[TABLE_ACTIONS.EDIT, TABLE_ACTIONS.DELETE]}
        placeholder="Action"
        className="rowActions"
      />
    ),
  }));

  function handleRowAction(event: DropdownChangeEvent) {
    const {
      target: { id, value },
    } = event;

    const currProductData = products.find((row) => row.id === id);

    openModal(value, { ...currProductData });
  }

  return (
    <>
      <div
        className="ag-theme-quartz"
        style={{
          height: "100%",
          marginTop: "2vh",
          opacity: isFetching ? "0.5" : "1",
        }}
      >
        <AgGridReact
          rowData={rowsData}
          columnDefs={productColumns}
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
}

export default Table;
