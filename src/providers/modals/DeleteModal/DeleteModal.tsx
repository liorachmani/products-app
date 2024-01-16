import { GridColumn, MSWResponseBody, Product, TableRow } from "@src/models";
import { GridOptions } from "ag-grid-community";
import { useModal } from "@src/providers";
import { useDeleteProductMutation } from "@src/redux/api";
import { customCellRenderer } from "@src/utils";
import { AgGridReact } from "ag-grid-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { MutableRefObject, useRef } from "react";

type DeleteModalProps = Omit<TableRow, "actions">;

function DeleteModal(props: DeleteModalProps) {
  const [deleteProduct, { isLoading: isProductBeingDeleted }] =
    useDeleteProductMutation();
  const { closeModal } = useModal();
  const toast = useRef() as MutableRefObject<Toast>;

  const headerElement = <h2>Are you sure you want to delete?</h2>;

  const handleRowDelete = async () => {
    try {
      const payload: MSWResponseBody = await deleteProduct(props.id).unwrap();
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: payload.text,
        life: 3000,
      });
    } catch (error) {
      let errMsg = "An error occured ";
      if (error instanceof Error) {
        errMsg += error.message;
      }

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: errMsg,
        life: 3000,
      });
    } finally {
      closeModal();
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={handleRowDelete}
        autoFocus
      />
    </div>
  );

  const columnDefs: GridColumn<Product>[] = [
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
  ];

  const gridOptions: GridOptions = {
    defaultColDef: { flex: 1 },
    rowHeight: 100,
    domLayout: "autoHeight",
  };

  return (
    <>
      <Toast ref={toast} />
      <div>
        <Dialog
          visible={true}
          modal
          header={headerElement}
          footer={footerContent}
          style={{ width: "50rem" }}
          onHide={closeModal}
        >
          {isProductBeingDeleted && <ProgressSpinner />}
          {!isProductBeingDeleted && (
            <div className="ag-theme-quartz" style={{ height: "100%" }}>
              <AgGridReact
                rowData={[{ ...props }]}
                columnDefs={columnDefs}
                gridOptions={gridOptions}
              />
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
}

export default DeleteModal;
