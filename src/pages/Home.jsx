import HomeContainer from "containers/HomeContainer";
import styled from "styled-components";

// * 페이지와 컨테이너의 역할 동시에 수행

export default function Home() {
  return (
    <StyledHome>
      <HomeContainer />
    </StyledHome>
  );
}

const StyledHome = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
