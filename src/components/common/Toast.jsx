import { clearLoadingState, selectAuth } from "modules/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const { signUpError, logInError, isLogInSuccess, isSignUpSuccess } =
    useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogInSuccess) {
      toast.success("로그인에 성공하였습니다.", optionToast);
    }
    if (isSignUpSuccess) {
      toast.success("회원가입에 성공하였습니다.", optionToast);
    }
    if (signUpError) {
      toast.error(signUpError, optionToast);
    }
    if (logInError) {
      toast.error(logInError, optionToast);
    }
    dispatch(clearLoadingState());
  }, [isLogInSuccess, isSignUpSuccess, signUpError, logInError]);
  return <ToastContainer />;
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
