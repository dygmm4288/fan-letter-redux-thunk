import createReducer from "lib/createReducer";
import { memberList } from "lib/member";
import { v4 as uuid } from "uuid";
import defaultAvatar from "../assets/img/default-avatar.png";

// 액션 설정 , memberlist에 C -> 추가, R, U , D가 있다.
const CREATE = "memberLetters/CREATE";
const UPDATE = "memberLetters/UPDATE";
const DELETE = "memberLetters/DELETE";
// 액션 생성자 설정
export const createMemberLetter = ({ nickname, content, selected }) => ({
  type: CREATE,
  payload: { nickname, content, selected },
});
export const updateMemberLetter = ({ id, content }) => ({
  type: UPDATE,
  payload: { id, content },
});
export const deleteMemberLetter = ({ id }) => ({
  type: DELETE,
  payload: { id },
});

// 초기 state 값
export const FAN_LETTER_KEY = "fan-letter";
const initialState = {
  memberLetters: (function () {
    return JSON.parse(localStorage.getItem(FAN_LETTER_KEY)) || [];
  })(),
};
// reducer 생성
const reducer = createReducer(initialState, {
  [CREATE]: (state, payload) => {
    const { nickname, content, selected } = payload;
    const newLetter = {
      nickname,
      content,
      writedTo: selected,
      id: uuid(),
      avatar: defaultAvatar,
      createdAt: new Date().toISOString(),
    };
    return {
      memberLetters: state.memberLetters.concat(newLetter),
    };
  },
  [UPDATE]: (state, payload) => {
    return {
      memberLetters: state.memberLetters.map(updateLetter(payload)),
    };
  },
  [DELETE]: (state, payload) => {
    const { id } = payload;
    return {
      memberLetters: state.memberLetters.filter(removeLetterById(id)),
    };
  },
});

const removeLetterById = (id) => (letter) => letter.id !== id;
const updateLetter = ({ id, content }) => {
  return (letter) => {
    if (letter.id === id) {
      return {
        ...letter,
        content,
      };
    }
    return letter;
  };
};
const memberListMap = memberList.reduce((a, c) => {
  a[c] = [];
  return a;
}, {});
function toMap(letters) {
  Object.keys(memberListMap).forEach((key) => (memberListMap[key] = []));
  letters.forEach((letter) => {
    memberListMap[letter.writedTo].push(letter);
  });
  return memberListMap;
}
export const selectMemberLetterList = (store) =>
  toMap(store.memberLettersReducer.memberLetters);
export const findLetterById = (id) => (letter) => letter.id === id;

export default reducer;
