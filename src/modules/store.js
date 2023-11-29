import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구
import memberLettersReducer, { FAN_LETTER_KEY } from "./memberLetters";
import localStorageMiddleware from "./middlewares/localStorageMiddleware";
import modalReducer from "./modal";
import selectedMemberReducer from "./selectedMember";
const rootReducer = combineReducers({
  memberLettersReducer,
  selectedMemberReducer,
  modalReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(localStorageMiddleware(FAN_LETTER_KEY))),
);

export default store;
