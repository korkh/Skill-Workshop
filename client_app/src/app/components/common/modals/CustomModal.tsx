import { observer } from "mobx-react-lite";
import { ModalContainer, ModalBody, ModalContent, ModalCloseButton } from ".";
import { useStore } from "../../../stores/store";

const CustomModal = observer(() => {
  const { modalStore } = useStore();

  const closeModal = () => {
    modalStore.closeModal();
  };

  return (
    <ModalContainer open={modalStore.modal.open}>
      <ModalContent>
        <ModalCloseButton onClick={closeModal}>Close</ModalCloseButton>
        <ModalBody>{modalStore.modal.body}</ModalBody>
      </ModalContent>
    </ModalContainer>
  );
});

export default CustomModal;
