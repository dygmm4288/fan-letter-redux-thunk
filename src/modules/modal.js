import createReducer from "lib/createReducer";

// 상수
export const IS_CONFIRM = "isConfirm";
export const IS_ALERT = "isAlert";

// 액션 타입
const SET = "modal/SET";
const ALL_CLOSE = "modal/ALL_CLOSE";

// 액션 생성자 함수
export const setModalState = ({ key, value }) => ({
  type: SET,
  payload: { key, value },
});
export const setModalAllClose = () => ({ type: ALL_CLOSE });
// 초기화 생성
const initialState = {
  isConfirm: false,
  isAlert: false,
};
// 리듀서

const reducer = createReducer(initialState, {
  [SET]: (state, payload) => {
    const { key, value } = payload;
    return { [key]: value };
  },
  [ALL_CLOSE]: (state, payload) => {
    return { isConfirm: false, isAlert: false };
  },
});

export const selectIsConfirm = (store) => store.modalReducer.isConfirm;
export const selectIsAlert = (store) => store.modalReducer.isAlert;

export default reducer;
