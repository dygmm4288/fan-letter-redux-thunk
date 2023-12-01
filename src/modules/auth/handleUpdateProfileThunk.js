export default function handleUpdateProfileThunk(thunk) {
  return {
    [thunk.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateError = false;
      state.updateError = null;
      state.isUpdateSuccess = false;
    },
    [thunk.fulfilled]: (state, action) => {
      state.isUpdateLoading = false;
      state.isUpdateSuccess = true;

      if (action.payload?.nickname) state.nickname = action.payload.nickname;
      if (action.payload?.avatar) state.avatar = action.payload.avatar;
    },
    [thunk.rejected]: (state, action) => {
      state.isUpdateLoading = false;
      state.isUpdateError = true;
      state.updateError =
        action.payload?.response.data.message ||
        "네트워크 통신에 실패했습니다.";
    },
  };
}
