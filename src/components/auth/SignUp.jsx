import useInput from "components/hooks/useInput";
import { registerThunk, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, handleChangeId] = useInput();
  const [password, handleChangePassword] = useInput();
  const [nickname, handleChangeNickname] = useInput();

  const { isSignUpSuccess } = useSelector(selectAuth);

  useEffect(() => {
    if (isSignUpSuccess) {
      navigate("/login");
    }
  }, [isSignUpSuccess]);

  const handleSignUp = (event) => {
    event.preventDefault();
    dispatch(registerThunk({ id, password, nickname }));
  };

  return (
    <StLoginWrapper>
      <StLoginForm onSubmit={handleSignUp}>
        <StLoginHeader>회원가입</StLoginHeader>
        <StInput
          name='id'
          type='text'
          placeholder='아이디 (4~10글자)'
          minLength={4}
          maxLength={10}
          required
          value={id}
          onChange={handleChangeId}
        />
        <StInput
          name='password'
          type='password'
          placeholder='비밀번호 (4~15글자)'
          minLength={4}
          maxLength={15}
          required
          value={password}
          onChange={handleChangePassword}
        />
        <StInput
          name='nickname'
          type='text'
          placeholder='닉네임 (1~10글자)'
          minLength={1}
          maxLength={10}
          required
          value={nickname}
          onChange={handleChangeNickname}
        />
        <StLoginButton type='submit'>회원가입</StLoginButton>
        <Link to='/login'>로그인</Link>
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
