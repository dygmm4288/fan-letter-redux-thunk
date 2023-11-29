import useInput from "components/hooks/useInput";
import { registerThunk, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSignUp}>
      <h1>회원가입</h1>
      <input
        name='id'
        type='text'
        placeholder='아이디 (4~10글자)'
        minLength={4}
        maxLength={10}
        required
        value={id}
        onChange={handleChangeId}
      />
      <input
        name='password'
        type='password'
        placeholder='비밀번호 (4~15글자)'
        minLength={4}
        maxLength={15}
        required
        value={password}
        onChange={handleChangePassword}
      />
      <input
        name='nickname'
        type='text'
        placeholder='닉네임 (1~10글자)'
        minLength={1}
        maxLength={10}
        required
        value={nickname}
        onChange={handleChangeNickname}
      />
      <button type='submit'>회원가입</button>
      <Link to='/login'>로그인</Link>
    </form>
  );
}
