import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Product } from "@src/models";
import { ReactNode } from "react";
import "./ProductsTable.scss";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Image } from "primereact/image";
import { useGetAllProductsQuery } from "@src/redux/api";
import { useModal } from "@src/providers";
import { customCellRenderer, extractReduxHookErrorMessage } from "@src/utils";
import { assetsPath } from "@src/constants";
import { RootState, useAppSelector } from "@src/redux";
import styled, { css } from "styled-components";
import { Table, ErrorComponent, Loading } from "@src/uiKit";

export interface TableRow extends Omit<Product, "image"> {
  image: JSX.Element;
  actions: ReactNode;
}

interface TableWrapperProps {
  className?: string;
  isLoading?: boolean;
}

enum PRODUCTS_TABLE_ACTIONS {
  EDIT = "edit",
  DELETE = "delete",
}

const TableWrapper = styled.div<TableWrapperProps>`
  &.ag-theme-quartz {
    margin-top: 2vh;
  }

  ${(props) =>
    props.isLoading &&
    css`
      opacity: 0.5;
    `}
`;

const ProductsTable = () => {
  const { category, filterText } = useAppSelector(
    (store: RootState) => store.search
  );

  const {
    data: products = [],
    error,
    isError,
    isFetching,
  } = useGetAllProductsQuery({ category, filterText });

  const { openModal } = useModal();

  if (isError) {
    return (
      <ErrorComponent errorMessage={extractReduxHookErrorMessage(error)} />
    );
  }
  if (isFetching && products.length === 0) return <Loading />;

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

  const handleRowAction = (event: DropdownChangeEvent) => {
    const {
      target: { id, value },
    } = event;

    const currProductData = products.find((row) => row.id === id);

    openModal(value, { ...currProductData });
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
        onChange={handleRowAction}
        options={
          [
            PRODUCTS_TABLE_ACTIONS.EDIT,
            PRODUCTS_TABLE_ACTIONS.DELETE,
          ] as Array<PRODUCTS_TABLE_ACTIONS>
        }
        placeholder="Action"
        className={["rowActions", "tableActionsDropdown"].join(" ")}
      />
    ),
  }));

  return (
    <>
      <TableWrapper className="ag-theme-quartz" isLoading={isFetching}>
        {/* <AgGridReact
          rowData={rowsData}
          columnDefs={productColumns}
          gridOptions={gridOptions}
        /> */}

        <Table rowData={rowsData} columnDefs={productColumns} />
      </TableWrapper>
    </>
  );
};

export { ProductsTable };
