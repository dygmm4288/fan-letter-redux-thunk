import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonServerInstance from "api/serverInstance";
import defaultAvatar from "../assets/img/default-avatar.png";

export const fetchLettersThunk = createAsyncThunk(
  "letter/fetchLetterThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonServerInstance.get("/letters");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createLetterThunk = createAsyncThunk(
  "letter/createLetterThunk",
  async (payload, thunkAPI) => {
    try {
      const { nickname, content, selectedMemberName } = payload;

      const newLetter = {
        nickname,
        content,
        writedTo: selectedMemberName,
        avatar: defaultAvatar,
        createdAt: Date.now(),
      };

      await jsonServerInstance.post("/letters", newLetter);

      thunkAPI.dispatch(createLetter(newLetter));

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateLetterThunk = createAsyncThunk(
  "letter/updateLetterThunk",
  async (payload, thunkAPI) => {
    const { id, content } = payload;
    try {
      await jsonServerInstance.patch(`/letters/${id}`, { content });
      thunkAPI.dispatch(updateLetter({ id, content }));
      return { id, content };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const deleteLetterThunk = createAsyncThunk(
  "letter/deleteLetterThunk",
  async (payload, thunkAPI) => {
    const { id } = payload;
    try {
      await jsonServerInstance.delete(`/letters/${id}`);
      thunkAPI.dispatch(deleteLetter({ id }));
      return { id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

// 어떻게 해야 처음에 letterSlice가 들어올 때 맨 처음에 데이터를 가져올까?

const initialState = {
  letters: [],
  selectedMemberName: "카리나",
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    createLetter: (state, action) => {
      state.letters.push(action.payload);
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
  extraReducers: {
    [fetchLettersThunk.rejected]: (state, action) => {},
    [fetchLettersThunk.fulfilled]: (state, action) => {
      state.letters = action.payload;
    },
    [fetchLettersThunk.pending]: (state, action) => {
      console.log("pending fetchLettersThunk");
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
export const selectLetters = (store) =>
  store.letterReducer.letters.filter(
    (letter) => letter.writedTo === store.letterReducer.selectedMemberName,
  );
export const selectLetter = (id) => (store) =>
  store.letterReducer.letters.find((letter) => letter.id === id);

export default letterSlice.reducer;
