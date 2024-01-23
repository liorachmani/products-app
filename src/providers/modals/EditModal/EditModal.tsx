import {
  MSWResponseBody,
  Product,
  currentAvailableBrands,
  currentAvailableImages,
  productSchema,
} from "@src/models";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useModal } from "@src/providers";
import { useEditProductMutation } from "@src/redux/api";
import { customCellRenderer, extractErrorMessage } from "@src/utils";
import { GridOptions, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import { toast } from "react-toastify";

type EditModalProps = Product & {
  open: boolean;
  onClose: () => void;
};
type EditableFields = Product;

function EditModal(props: EditModalProps) {
  const [editProduct, { isLoading: isProductBeingUpdated }] =
    useEditProductMutation();

  const [isValidRow, setIsValidRow] = useState<boolean>(true);

  const { closeModal } = useModal();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open, onClose, ...canBeEdited } = props;

  const [editedRowValues, setEditedRowValues] = useState<EditableFields>({
    ...canBeEdited,
  });

  const gridOptions: GridOptions = {
    defaultColDef: { flex: 1 },
    rowHeight: 100,
    domLayout: "autoHeight",
    onCellEditingStopped: (event) => {
      try {
        const colId = event.column.getColId() as keyof EditableFields;

        const newRow = { ...editedRowValues, [colId]: event.newValue };

        const parsedNewProduct = productSchema.validateSync(newRow);

        setIsValidRow(true);
        setEditedRowValues({ ...parsedNewProduct });
      } catch (error) {
        const errMsg = extractErrorMessage(error);
        toast.error(errMsg);
        setIsValidRow(false);
      }
    },
  };

  const handleEditRowSave = async () => {
    try {
      const payload: MSWResponseBody = await editProduct({
        ...editedRowValues,
        oldId: props.id,
      }).unwrap();
      toast.success(payload.text);
    } catch (error) {
      const errMsg = extractErrorMessage(error);
      toast.error(errMsg);
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
        onClick={handleEditRowSave}
        disabled={isProductBeingUpdated || !isValidRow}
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
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: currentAvailableBrands,
      },
    },
    {
      field: "image",
      cellRenderer: customCellRenderer,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: currentAvailableImages,
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
