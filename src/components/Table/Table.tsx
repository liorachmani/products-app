import { AgGridReact } from "ag-grid-react";
import { GridOptions } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { GridColumn, Product } from "@src/models";
import { ReactNode } from "react";
import "./Table.scss";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Image } from "primereact/image";
import { useGetAllProductsQuery } from "@src/redux/api";
import { ErrorComponent, Loading } from "@src/components";
import { useModal } from "@src/providers";
import { customCellRenderer } from "@src/utils";

type TableRow = Omit<Product, "image"> & { image: JSX.Element } & {
  actions: ReactNode;
};

enum TABLE_ACTIONS {
  EDIT = "edit",
  DELETE = "delete",
}

function Table() {
  // const { products } = useAppSelector(selectProducts);

  const {
    data: products = [],
    error,
    isError,
    // isFetching,
    isLoading,
  } = useGetAllProductsQuery();

  const { openModal } = useModal();

  if (isError) return <ErrorComponent error={error} />;
  if (isLoading) return <Loading />;

  const productColumns: GridColumn<TableRow>[] = [
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

  const gridOptions: GridOptions = {
    defaultColDef: { flex: 1 },
    rowHeight: 100,
    // paginationAutoPageSize: true,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    domLayout: "autoHeight",
  };

  const rowsData: TableRow[] = products.map((product) => ({
    ...product,
    image: <Image key={product.id} src={product.image} width="60%" preview />,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { actions, ...productData } = rowsData.find(
      (row) => row.id === id
    ) as TableRow;

    if (value === TABLE_ACTIONS.DELETE) {
      openModal("delete", { ...productData });
    }
  }

  return (
    <>
      <div
        id="mainGrid"
        className="ag-theme-quartz"
        style={{ height: "100%", marginTop: "2vh" }}
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
