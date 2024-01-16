import { createModalProvider } from "@giladappsforce/react-modal-provider";
import { DeleteModal } from "@src/providers/modals";

export const modals = {
  //   confirm: ConfirmModal,
  //   info: InfoModal,
  delete: DeleteModal,
  // rest of modals
};

export const { useModal, ModalProvider } = createModalProvider(modals);
