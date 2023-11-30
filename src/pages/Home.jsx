import Header from "components/Header";
import LetterForm from "components/letter/LetterForm";
import LetterList from "components/letter/LetterList";
import { fetchLettersThunk } from "modules/letterSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLettersThunk());
  }, []);

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
