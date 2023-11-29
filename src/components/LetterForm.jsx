import { memberKoreanMap } from "lib/member";
import styled from "styled-components";
import Button from "./common/Button";

const NICKNAME = "nickname";
const CONTENT = "content";
const SELECTED = "selected";

export default function LetterForm({
  members,
  formState,
  handleChangeFormValue,
  handleEnrollLetter,
}) {
  const { nickname, content } = formState;
  return (
    <StyledForm onSubmit={handleEnrollLetter}>
      <StyledInputWrapper>
        <StyledRow>
          <label htmlFor='nickname'>닉네임: </label>
          <input
            id='nickname'
            name='content'
            required
            value={nickname}
            onChange={handleChangeFormValue(NICKNAME)}
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
            onChange={handleChangeFormValue(CONTENT)}
            maxLength={100}
            placeholder='최대 100자까지만 작성할 수 있습니다.'></textarea>
        </StyledRow>
      </StyledInputWrapper>
      <StyledSelectWrapper>
        <label htmlFor='select-memeber'>누구에게 보내실 건가요?</label>
        <select id='select-member' onChange={handleChangeFormValue(SELECTED)}>
          <SelectOptions members={members} />
        </select>
      </StyledSelectWrapper>
      <Button type='submit'>팬레터 등록</Button>
    </StyledForm>
  );
}
function SelectOptions({ members }) {
  return members.map((member) => (
    <option key={"options-" + member} value={member}>
      {memberKoreanMap[member]}
    </option>
  ));
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
