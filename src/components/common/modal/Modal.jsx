import StyledButton from "components/common/Button";
import {
  TYPE_CONFIRM,
  closeModal,
  handleConfirm,
  selectModalState,
} from "modules/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function Modal() {
  const { isModalOpen, name, content, errorContent, openType } =
    useSelector(selectModalState);

  const dispatch = useDispatch();

  const handleCloseModal = (event) => {
    if (event.target !== event.currentTarget) return;
    dispatch(closeModal());
  };

  const handleConfirmAction = () => {
    dispatch(handleConfirm());
  };
  return (
    <>
      {isModalOpen && (
        <StModalWrapper isModalOpen={isModalOpen} onClick={handleCloseModal}>
          <StModal>
            <p>{content}</p>
            <StButtonContainer>
              {openType === TYPE_CONFIRM && (
                <StyledButton onClick={handleConfirmAction}>확인</StyledButton>
              )}
              <StyledButton onClick={handleCloseModal}>
                {openType === TYPE_CONFIRM ? "취소" : "확인"}
              </StyledButton>
            </StButtonContainer>
          </StModal>
        </StModalWrapper>
      )}
    </>
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
const StButtonContainer = styled.div`
  padding: 1rem 0rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
