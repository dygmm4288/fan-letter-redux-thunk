import styled from "styled-components";

export default function Modal({ text, children }) {
  return (
    <StModalWrapper>
      <StModal>
        <p>{text}</p>
        <StButtonWrapper>{children}</StButtonWrapper>
      </StModal>
    </StModalWrapper>
  );
}

const StModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  inset: 0;
  opacity: 0.8;
  background-color: rgb(211, 211, 211);
`;

const StModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: rgb(50, 50, 50);
  border-radius: 1rem;
  padding: 3rem;
  color: white;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 2rem;
`;
const StButtonWrapper = styled.div``;
