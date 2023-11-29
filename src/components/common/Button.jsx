import styled from "styled-components";

export default function Button({ handleClickEvent, children, type }) {
  return (
    <StyledButton type={type || "button"} onClick={handleClickEvent || null}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 0.25rem 0.8rem;

  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: yellow;
    color: black;
  }
`;
