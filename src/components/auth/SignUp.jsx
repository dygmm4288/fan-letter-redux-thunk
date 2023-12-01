import useInput from "components/hooks/useInput";
import _ from "lodash";
import { registerThunk, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonAuth, { StInput } from "./CommonAuth";

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

  const gte4 = _.partial(_.gte, _, 3);
  const isValidated = () =>
    _.every(_.map([id, password], _.size), gte4) && nickname.length >= 1;

  return (
    <CommonAuth
      type='회원가입'
      handleSubmit={handleSignUp}
      checkValidation={isValidated}>
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
    </CommonAuth>
  );
}
