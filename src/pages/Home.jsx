import Header from "components/Header";
import LetterForm from "components/LetterForm";
import LetterList from "components/LetterList";
import styled from "styled-components";

export default function Home() {
  return (
    <StyledHome>
      <Header />
      <LetterForm />
      <LetterList />
    </StyledHome>
  );
}

const StyledHome = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
