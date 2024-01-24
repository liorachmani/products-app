import { MSWResponseBody } from "@src/models";
import { ColDef } from "ag-grid-community";
import { useModal } from "@src/providers";
import { useDeleteProductMutation } from "@src/redux/api";
import { customCellRenderer, extractErrorMessage } from "@src/utils";
import { assetsPath } from "@src/constants";
import { toast } from "react-toastify";
import { ProductsTableRow } from "@src/components";
import { Loading, Dialog, Button, Table, Image } from "@src/uiKit";

interface Props extends Omit<ProductsTableRow, "actions"> {}

const columnDefs: ColDef<ProductsTableRow>[] = [
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
];

const DeleteModal = (props: Props) => {
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
          {isProductBeingDeleted && <Loading />}
          {!isProductBeingDeleted && (
            <div className="ag-theme-quartz">
              <Table rowData={rows} columnDefs={columnDefs} />
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
};

export { DeleteModal };
