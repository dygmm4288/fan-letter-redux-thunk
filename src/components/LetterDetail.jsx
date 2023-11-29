import { alter } from "lib/alter";
import { memberNameToKorean } from "lib/member";
import timeFormat from "lib/timeFormat";
import { IS_CONFIRM, setModalState } from "modules/modal";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Avatar from "./common/Avatar";
import Button from "./common/Button";

export default function LetterDetail({
  letter,
  isUpdate,
  handleChangeContent,
  contentValue,
  handleUpdateButton,
  handleUpdateDoneButton,
}) {
  const { nickname, avatar, createdAt, writedTo, content } = letter;
  const memberName = memberNameToKorean(writedTo);
  const dispatch = useDispatch();
  const UpdateButton = () => (
    <Button handleClickEvent={handleUpdateButton}>수정</Button>
  );
  const RemoveButton = () => (
    <Button
      handleClickEvent={() => {
        dispatch(setModalState({ key: IS_CONFIRM, value: true }));
      }}>
      삭제
    </Button>
  );
  const UpdateDoneButton = () => (
    <Button handleClickEvent={handleUpdateDoneButton}>수정 완료</Button>
  );
  const ifIsUpdateThan = alter(() => !isUpdate);

  return (
    <StyledDetail>
      <StyledDetailHeader>
        <Avatar nickname={nickname} src={avatar} />
        <h2>{nickname}</h2>
        <span>{timeFormat(createdAt)}</span>
      </StyledDetailHeader>
      <span>To : {memberName}</span>
      {ifIsUpdateThan(
        <StyledContent>{content}</StyledContent>,
        <StyledContentTextArea
          maxLength={100}
          onChange={handleChangeContent}
          value={contentValue}
        />,
      )}
      <StyledButtonWrapper>
        {ifIsUpdateThan(<UpdateButton />, <UpdateDoneButton />)}
        <RemoveButton />
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
