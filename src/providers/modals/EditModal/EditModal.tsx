import { MSWResponseBody, Product } from "@src/models";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useModal } from "@src/providers";
import { useEditProductMutation } from "@src/redux/api";
import { customCellRenderer } from "@src/utils";
import { GridOptions, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { MutableRefObject, useState } from "react";

type EditModalProps = Product & {
  toast: MutableRefObject<Toast>;
};
type EditableFields = Product;

function EditModal(props: EditModalProps) {
  const [editProduct, { isLoading: isProductBeingUpdated }] =
    useEditProductMutation();

  const { closeModal } = useModal();

  const { toast, ...canBeEdited } = props;

  // const { id, image, ...canBeEdited } = props;

  const [editedRowValues, setEditedRowValues] = useState<EditableFields>({
    ...canBeEdited,
  });

  const gridOptions: GridOptions = {
    defaultColDef: { flex: 1 },
    rowHeight: 100,
    domLayout: "autoHeight",
    onCellEditingStopped: (event) => {
      const colId = event.column.getColId() as keyof EditableFields;

      //   console.log({ ...editedRowValues, [colId]: event.newValue });

      setEditedRowValues((prev) => ({ ...prev, [colId]: event.newValue }));
    },
    // onRowEditingStopped: (event) => console.log(event),
  };

  const handleEditRow = async () => {
    try {
      const payload: MSWResponseBody = await editProduct({
        ...editedRowValues,
        oldId: props.id,
      }).unwrap();
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

  const headerElement = <h2>Editing Row:</h2>;

  const footerContent = (
    <div>
      <Button
        label="Save"
        severity="success"
        onClick={handleEditRow}
        disabled={isProductBeingUpdated}
        text
        raised
      />
      <Button
        label="Cancel"
        severity="danger"
        onClick={closeModal}
        disabled={isProductBeingUpdated}
        text
        raised
      />
    </div>
  );
  const columnDefs: ColDef<Product>[] = [
    {
      field: "name",
      cellRenderer: undefined,
      editable: true,
    },
    {
      field: "brand",
      cellRenderer: undefined,
      editable: true,
    },
    {
      field: "image",
      // cellRenderer: undefined,
      cellRenderer: customCellRenderer,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["shirt", "pants", "socks", "shoes", "ball"],
      },
    },
    {
      field: "price",
      cellRenderer: undefined,
      editable: true,
    },
    {
      field: "id",
      cellRenderer: undefined,
      editable: true,
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
          {isProductBeingUpdated && <ProgressSpinner />}
          {!isProductBeingUpdated && (
            <div className="ag-theme-quartz" style={{ height: "100%" }}>
              <AgGridReact
                rowData={[{ ...editedRowValues }]}
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

export default EditModal;
