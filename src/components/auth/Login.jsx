import useInput from "components/hooks/useInput";
import { logInThunk, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  const [id, handleChangeId] = useInput();
  const [password, handleChangePassword] = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin } = useSelector(selectAuth);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const handleSingIn = (event) => {
    event.preventDefault();

    dispatch(logInThunk({ id, password }));
  };

  return (
    <StLoginWrapper>
      <StLoginForm onSubmit={handleSingIn}>
        <StLoginHeader>로그인</StLoginHeader>
        <StInput
          type='text'
          placeholder='아이디 (4~10글자)'
          minLength={4}
          maxLength={10}
          required
          onChange={handleChangeId}
          value={id}
        />
        <StInput
          type='password'
          placeholder='비밀번호 (4~s15글자)'
          minLength={4}
          maxLength={15}
          required
          onChange={handleChangePassword}
          value={password}
        />
        <button type='submit'>로그인</button>
        <Link to='/register'>회원가입</Link>
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

const StInput = styled.input`
  outline: none;
  padding: 0.5rem;
`;
const StLoginButton = styled.button``;
