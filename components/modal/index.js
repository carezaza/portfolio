import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  z-index: 99999;
`;

function Modal({ children, handleClose }) {
  return <ModalContainer onClick={handleClose}>{children}</ModalContainer>;
}

export default Modal;
