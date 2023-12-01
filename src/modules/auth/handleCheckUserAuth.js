import {
  setAccessTokenAtLocal,
  setAvatarSrcAtLocal,
  setNickNameAtLocal,
  setUserIdAtLocal,
} from "lib/localStorage";

export default function handleCheckUserAuth(thunk) {
  return {
    [thunk.pending]: (state) => {
      state.isLogInLoading = true;
      state.isLogInError = false;
      state.logInError = null;
      state.isValidToken = true;
    },
    [thunk.fulfilled]: (state) => {},
    [thunk.rejected]: (state, action) => {
      setAccessTokenAtLocal(null);
      setUserIdAtLocal(null);
      setNickNameAtLocal(null);
      setAvatarSrcAtLocal(null);

      state.isSignUpLoading = false;
      state.isSignUpError = true;
      state.signUpError =
        action.payload?.response.data.message ||
        "네트워크 통신에 실패했습니다.";
      state.isSignUpSuccess = false;
      state.isValidToken = false;
    },
  };
}
