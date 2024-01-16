import { createModalProvider } from "@giladappsforce/react-modal-provider";
import { DeleteModal, EditModal } from "@src/providers/modals";

export const modals = {
  delete: DeleteModal,
  edit: EditModal,
};

export const { useModal, ModalProvider } = createModalProvider(modals);
