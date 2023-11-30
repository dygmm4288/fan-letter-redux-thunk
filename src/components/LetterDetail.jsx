import timeFormat from "lib/timeFormat";
import { deleteLetterThunk, updateLetter } from "modules/letterSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Avatar from "./common/Avatar";
import Button from "./common/Button";
import useInput from "./hooks/useInput";
import useModal from "./hooks/useModal";

export default function LetterDetail({ letter }) {
  const {
    id,
    nickname,
    avatar,
    createdAt,
    writedTo: memberName,
    content,
  } = letter;

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editedContent, handleEditContent] = useInput(content);

  const dispatch = useDispatch();

  const { confirmModal } = useModal();

  const handleOnEditMode = () => {
    setIsEditingMode(true);
  };

  const handleClickRemoveButton = () => {
    confirmModal({
      name: "게시글 삭제",
      content: "정말로 삭제하시겠습니까?",
      onConfirm: () => {
        dispatch(deleteLetterThunk({ id }));
      },
    });
  };

  const handleOffEditMode = () => {
    if (editedContent === content) {
      return;
    }

    dispatch(updateLetter({ id, content: editedContent }));
    setIsEditingMode(false);
  };

  return (
    <StyledDetail>
      <StyledDetailHeader>
        <Avatar nickname={nickname} src={avatar} />
        <h2>{nickname}</h2>
        <span>{timeFormat(createdAt)}</span>
      </StyledDetailHeader>
      <span>To : {memberName}</span>
      {!isEditingMode ? (
        <StyledContent>{content}</StyledContent>
      ) : (
        <StyledContentTextArea
          maxLength={100}
          onChange={handleEditContent}
          value={editedContent}
        />
      )}
      <StyledButtonWrapper>
        {!isEditingMode ? (
          <Button onClick={handleOnEditMode}>수정</Button>
        ) : (
          <Button onClick={handleOffEditMode} />
        )}
        <Button onClick={handleClickRemoveButton}>삭제</Button>
      </StyledButtonWrapper>
    </StyledDetail>
  );
}
const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  width: 800px;
  min-height: 500px;
  background-color: gray;
  padding: 1rem;

  & > span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
const StyledDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  h2 {
    flex: 1;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
const StyledContent = styled.p`
  background-color: black;
  min-height: 250px;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  color: white;
`;
const StyledContentTextArea = styled.textarea`
  background-color: black;
  min-height: 250px;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  color: white;
`;

const StyledButtonWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 0.5rem;
  * {
    font-size: 1.5rem;
  }
`;
