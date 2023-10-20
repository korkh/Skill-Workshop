import styled from "styled-components";

interface ModalProps {
  open: boolean;
}
const ModalContainer = styled.div<ModalProps>`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: transparent;
  border-radius: 8px;
  text-align: right;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
`;

const ModalBody = styled.div`
  padding: 10px;
`;

export { ModalContainer, ModalContent, ModalBody, ModalCloseButton };
