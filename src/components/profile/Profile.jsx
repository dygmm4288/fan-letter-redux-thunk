import Avatar from "components/common/Avatar";
import StyledButton from "components/common/Button";
import styled from "styled-components";

export default function Profile() {
  const nickname = "그으으으으";
  const userId = "yeolttt";

  return (
    <StWrapper>
      <StProfileWrapper>
        <h1>프로필 관리</h1>
        <Avatar width={128} height={128} />
        <h3>{nickname}</h3>
        <p>{userId}</p>
        <StyledButton>수정하기</StyledButton>
      </StProfileWrapper>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  height: 100vh;

  display: flex;
  > * {
    margin: auto;
  }
`;
const StProfileWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  background-color: lightgray;

  border-radius: 1.5rem;

  text-align: center;
  h1 {
    font-size: 2rem;
  }

  img {
    margin: 0 auto;
  }
`;
