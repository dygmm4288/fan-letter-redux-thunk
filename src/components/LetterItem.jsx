import timeFormat from "lib/timeFormat";
import styled from "styled-components";
import Avatar from "./common/Avatar";

export default function LetterItem({
  handleNavigate,
  id,
  createdAt,
  nickname,
  content,
  avatar,
}) {
  return (
    <li onClick={handleNavigate(id)}>
      <StyledLetterItemWrapper>
        <Avatar src={avatar} alt={nickname + "user avatar profile"} />
        <StyledLetterItemInfo>
          <span>{nickname}</span>
          <span>{timeFormat(createdAt)}</span>
          <span>{content}</span>
        </StyledLetterItemInfo>
      </StyledLetterItemWrapper>
    </li>
  );
}

const StyledLetterItemWrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;

  color: white;

  border: 1px solid white;
  gap: 1rem;

  div:first-child {
    flex: 0.2;
  }
`;

const StyledLetterItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  overflow: hidden;

  span:last-child {
    padding: 0.5rem;
    background-color: rgb(50, 50, 50);
    border-radius: 0.5rem;

    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
`;
