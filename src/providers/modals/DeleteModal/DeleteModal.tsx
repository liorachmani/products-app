import { MSWResponseBody, TableRow } from "@src/models";
import { GridOptions, ColDef } from "ag-grid-community";
import { useModal } from "@src/providers";
import { useDeleteProductMutation } from "@src/redux/api";
import { customCellRenderer, extractErrorMessage } from "@src/utils";
import { AgGridReact } from "ag-grid-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Image } from "primereact/image";
import { assetsPath } from "@src/constants";
import { toast } from "react-toastify";

type DeleteModalProps = Omit<TableRow, "actions">;

function DeleteModal(props: DeleteModalProps) {
  const [deleteProduct, { isLoading: isProductBeingDeleted }] =
    useDeleteProductMutation();
  const { closeModal } = useModal();

  const headerElement = <h2>Are you sure you want to delete?</h2>;

  const handleRowDelete = async () => {
    try {
      const payload: MSWResponseBody = await deleteProduct(props.id).unwrap();
      toast.success(payload.text);
    } catch (error) {
      const errMsg = extractErrorMessage(error);
      toast.error(errMsg);
    } finally {
      closeModal();
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Confirm"
        disabled={isProductBeingDeleted}
        text
        raised
        severity="info"
        onClick={handleRowDelete}
        autoFocus
      />
    </div>
  );

  const columnDefs: ColDef<TableRow>[] = [
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

  const rows = [
    {
      ...props,
      image: <Image src={`${assetsPath}${props.image}.png`} width="60%" />,
    },
  ];

  return (
    <>
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
                rowData={rows}
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
