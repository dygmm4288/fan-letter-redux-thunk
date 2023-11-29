import useInput from "components/hooks/useInput";
import { logInThunk, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [id, handleChangeId] = useInput();
  const [password, handleChangePassword] = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoginSuccess } = useSelector(selectAuth);

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/");
    }
  }, [isLoginSuccess]);

  const handleSingIn = (event) => {
    event.preventDefault();

    dispatch(logInThunk({ id, password }));
  };

  return (
    <form onSubmit={handleSingIn}>
      <h1>로그인</h1>
      <input
        type='text'
        placeholder='아이디 (4~10글자)'
        minLength={4}
        maxLength={10}
        required
        onChange={handleChangeId}
        value={id}
      />
      <input
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
    </form>
  );
}
