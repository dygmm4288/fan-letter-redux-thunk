import useInput from "components/hooks/useInput";
import { logInThunk, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonAuth, { StInput } from "./CommonAuth";

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

  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(logInThunk({ id, password }));
  };

  const isDisabled = !(id.length >= 4 && password.length >= 4);

  return (
    <CommonAuth
      type='로그인'
      handleSubmit={handleSignIn}
      isDisabled={isDisabled}>
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
        placeholder='비밀번호 (4~15글자)'
        minLength={4}
        maxLength={15}
        required
        onChange={handleChangePassword}
        value={password}
      />
    </CommonAuth>
  );
}
