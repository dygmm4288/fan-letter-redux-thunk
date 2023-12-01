import { clearLoadingState, selectAuth } from "modules/auth/authSlice";
import { clearLetterState, selectLetterState } from "modules/letterSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const {
    signUpError,
    logInError,
    isLogInSuccess,
    isSignUpSuccess,
    isUpdateError,
    isUpdateSuccess,
  } = useSelector(selectAuth);
  const { error: letterError } = useSelector(selectLetterState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogInSuccess) {
      toast.success("로그인에 성공하였습니다.", optionToast);
    }
    if (isSignUpSuccess) {
      toast.success("회원가입에 성공하였습니다.", optionToast);
    }
    if (isUpdateSuccess) {
      toast.success("프로필이 업데이트되었습니다.", optionToast);
    }

    if (signUpError) {
      toast.error(signUpError, optionToast);
    }
    if (logInError) {
      toast.error(logInError, optionToast);
    }
    if (signUpError) {
      toast.error(signUpError, optionToast);
    }
    if (logInError) {
      toast.error(logInError, optionToast);
    }
    if (isUpdateError) {
      toast.error(isUpdateError, optionToast);
    }
    if (letterError) {
      toast.error(letterError, optionToast);
    }
    dispatch(clearLoadingState());
    dispatch(clearLetterState());
  }, [
    isLogInSuccess,
    isSignUpSuccess,
    signUpError,
    logInError,
    isUpdateError,
    isUpdateSuccess,
    letterError,
    dispatch,
  ]);
  return <ToastContainer {...optionToast} />;
}

const optionToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined,
  theme: "light",
  pauseOnHover: false,
};
