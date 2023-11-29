import createReducer from "lib/createReducer";
import { KARINA } from "lib/member";

// 액션 타입
const SET = "selectedMember/SET";
// 액션 생성자 함수
export const setSelectedMember = (member) => ({
  type: SET,
  payload: { member },
});
// 리듀서
const initialState = {
  selectedMember: KARINA,
};

const reducer = createReducer(initialState, {
  [SET]: (_, payload) => {
    return { selectedMember: payload.member };
  },
});

export const selectMember = (store) =>
  store.selectedMemberReducer.selectedMember;
export default reducer;
