import { setAccessTokenAtLocal } from "lib/localStorage";

export default function handleLoginThunk(logInThunk) {
  return {
    [logInThunk.pending]: (state) => {
      state.isLogInLoading = true;
      state.isLogInError = false;
      state.logInError = null;
      state.isLogInSuccess = false;
    },
    [logInThunk.fulfilled]: (state, action) => {
      const { accessToken, userId, avatar, nickname } = action.payload;

      setAccessTokenAtLocal(accessToken);

      state.userId = userId;
      state.avatar = avatar;
      state.nickname = nickname;

      state.isLogInLoading = false;
      state.isLogInSuccess = true;
    },
    [logInThunk.rejected]: (state, action) => {
      state.isLogInLoading = false;
      state.isLogInError = true;
      state.logInError = action.payload;
    },
  };
}
