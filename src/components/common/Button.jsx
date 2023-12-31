import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.25rem 0.8rem;

  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: yellow;
    color: black;
  }
  &:disabled {
    background-color: lightgray;
    color: black;
    cursor: not-allowed;
  }
`;
export default StyledButton;
