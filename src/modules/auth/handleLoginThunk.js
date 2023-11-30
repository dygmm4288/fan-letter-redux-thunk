import {
  setAccessTokenAtLocal,
  setAvatarSrcAtLocal,
  setNickNameAtLocal,
  setUserIdAtLocal,
} from "lib/localStorage";

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
      setUserIdAtLocal(userId);
      setNickNameAtLocal(nickname);
      setAvatarSrcAtLocal(avatar);

      state.userId = userId;
      state.avatar = avatar;
      state.nickname = nickname;

      state.isLogInLoading = false;
      state.isLogInSuccess = true;
      state.isLogin = true;
    },
    [logInThunk.rejected]: (state, action) => {
      state.isLogInLoading = false;
      state.isLogInError = true;
      state.logInError = action.payload;
      state.isLogin = false;
    },
  };
}
