export default function handleRegisterThunk(registerThunk) {
  return {
    [registerThunk.pending]: (state) => {
      state.isSignUpLoading = true;
      state.isSignUpError = false;
      state.signUpError = null;
      state.isSignUpSuccess = false;
    },
    [registerThunk.fulfilled]: (state) => {
      state.isSignUpLoading = false;
      state.isSignUpError = false;
      state.signUpError = null;
      state.isSignUpSuccess = true;
    },
    [registerThunk.rejected]: (state, action) => {
      state.isSignUpLoading = false;
      state.isSignUpError = true;
      state.signUpError =
        action.payload?.response.data.message ||
        "네트워크 통신에 실패했습니다.";
      state.isSignUpSuccess = false;
    },
  };
}
