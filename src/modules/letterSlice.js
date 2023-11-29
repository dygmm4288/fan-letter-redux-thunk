import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import defaultAvatar from "../assets/img/default-avatar.png";

const initialState = {
  letters: [],
  selectedMemberName: "카리나",
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    createLetter: (state, action) => {
      const { nickname, content } = action.payload;

      const newLetter = {
        nickname,
        content,
        wirtedTo: state.selectedMemberName,
        id: uuid(),
        avatar: defaultAvatar,
        createdAt: new Date(),
      };

      state.letters.push(newLetter);
    },

    updateLetter: (state, action) => {
      const { id, content } = action.payload;

      const index = state.letters.findIndex((letter) => letter.id === id);

      state.letters[index] = content;
    },
    deleteLetter: (state, action) => {
      const { id } = action.payload;

      const index = state.letters.findIndex((letter) => letter.id === id);

      if (index !== -1) return;

      state.letters.splice(index, 1);
    },
    setSelectedMemberName: (state, action) => {
      state.selectedMemberName = action.payload;
    },
  },
});
export const {
  createLetter,
  updateLetter,
  deleteLetter,
  setSelectedMemberName,
} = letterSlice.actions;

export const selectMemberName = (store) =>
  store.letterReducer.selectedMemberName;
export const selectLetter = (store) =>
  store.letterReducer.letters.filter(
    (letter) => letter.writedTo === store.letterReducer.selectedMemberName,
  );

export default letterSlice.reducer;
