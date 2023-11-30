import members from "data/members";
import {
  createLetterThunk,
  selectMemberName,
  setSelectedMemberName,
} from "modules/letterSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../common/Button";
import useInput from "../hooks/useInput";

export default function LetterForm() {
  const [nickname, handleNickName] = useInput();
  const [content, handleContent] = useInput();

  const dispatch = useDispatch();
  const selectedMemberName = useSelector(selectMemberName);

  const handleChangeMemberName = (event) => {
    dispatch(setSelectedMemberName(event.target.value));
  };

  const handleEnrollLetter = (event) => {
    event.preventDefault();

    dispatch(createLetterThunk({ nickname, content, selectedMemberName }));
  };

  return (
    <StyledForm onSubmit={handleEnrollLetter}>
      <StyledInputWrapper>
        <StyledRow>
          <label htmlFor='nickname'>닉네임: </label>
          <input
            id='nickname'
            name='nickname'
            required
            value={nickname}
            onChange={handleNickName}
            placeholder='최대 20글자까지만 작성할 수 있습니다'
          />
        </StyledRow>
        <StyledRow>
          <label htmlFor='content'>내용:</label>
          <textarea
            name='content'
            id='content'
            cols='20'
            rows='5'
            required
            value={content}
            onChange={handleContent}
            maxLength={100}
            placeholder='최대 100자까지만 작성할 수 있습니다.'></textarea>
        </StyledRow>
      </StyledInputWrapper>
      <StyledSelectWrapper>
        <label htmlFor='select-member'>누구에게 보내실 건가요?</label>
        <select
          id='select-member'
          value={selectedMemberName}
          onChange={handleChangeMemberName}>
          {members.map(({ name: memberName }) => (
            <option key={"option-" + memberName} value={memberName}>
              {memberName}
            </option>
          ))}
        </select>
      </StyledSelectWrapper>
      <Button type='submit'>팬레터 등록</Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 512px;
  margin: 0 auto;
  background-color: gray;

  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    align-self: flex-end;
  }
  border-radius: 0.5rem;
`;
const StyledSelectWrapper = styled.div`
  label {
    margin-right: 1rem;
  }
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  label {
    flex: 0.2;
  }
  input,
  textarea {
    flex: 1;
    padding: 0.5rem;
  }
  textarea {
    resize: none;
  }
`;
