import AlertModal from "components/AlertModal";
import ConfirmModal from "components/ConfirmModal";
import EmptyLetterDetail from "components/EmptyLetterDetail";
import LetterDetail from "components/LetterDetail";
import { deleteLetter, selectLetter } from "modules/letterSlice";
import {
  selectIsAlert,
  selectIsConfirm,
  setModalAllClose,
} from "modules/modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Detail() {
  const { id } = useParams();
  const letter = useSelector(selectLetter(id));

  const isConfirm = useSelector(selectIsConfirm);
  const isAlert = useSelector(selectIsAlert);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveButton = () => {
    dispatch(deleteLetter({ id }));
    dispatch(setModalAllClose());
    navigate("/");
  };

  return (
    <StyledDetail>
      <Link to='/'> 홈으로</Link>
      {letter ? <EmptyLetterDetail /> : <LetterDetail letter={letter} />}
      {isConfirm && <ConfirmModal handleConfirm={handleRemoveButton} />}
      {isAlert && <AlertModal text='아무런 수정 사항이 없습니다.' />}
    </StyledDetail>
  );
}

const StyledDetail = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  & > a {
    padding: 1rem 1.5rem;
    background-color: black;
    color: white;
    display: inline-block;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;

    border-left: 1.5px solid gray;
    border-top: 1.5px solid gray;

    box-shadow: 5px 5px 5px black;

    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
