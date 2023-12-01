import _ from "lodash";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const TYPE_LOGIN = "로그인";
export const TYPE_SIGN_UP = "회원가입";

export default function CommonAuth({
  type,
  children,
  handleSubmit,
  isDisabled,
}) {
  return (
    <StLoginWrapper>
      <StLoginForm onSubmit={handleSubmit}>
        <StLoginHeader>{type}</StLoginHeader>
        {children}
        <StButton type='submit' disabled={isDisabled}>
          {type}
        </StButton>
        <Link to={_.isEqual(type, TYPE_LOGIN) ? "/register" : "/login"}>
          {_.isEqual(type, TYPE_SIGN_UP) ? TYPE_LOGIN : TYPE_SIGN_UP}
        </Link>
      </StLoginForm>
    </StLoginWrapper>
  );
}

const StLoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
  display: flex;
  > * {
    margin: auto;
  }
  background-color: lightgray;
`;
const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  gap: 1rem;

  padding: 1rem;
  width: 450px;
  height: 300px;
  border-radius: 0.5rem;

  background-color: white;

  * {
    text-align: center;
  }
`;
const StLoginHeader = styled.h1`
  font-size: 2.5rem;
`;
export const StInput = styled.input`
  outline: none;
  padding: 0.5rem;
`;
export const StButton = styled.button`
  outline: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: lightgreen;

  &:disabled {
    background-color: lightgray;
  }
`;
