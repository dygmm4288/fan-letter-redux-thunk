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

      const response = await jsonServerInstance.post("/letters", newLetter);
      thunkAPI.dispatch(createLetter(response.data));

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
      thunkAPI.dispatch(updateLetter({ id, content }));
      await jsonServerInstance.patch(`/letters/${id}`, { content });
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
    thunkAPI.dispatch(deleteLetter({ id }));
    try {
      await jsonServerInstance.delete(`/letters/${id}`);
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
      if (index === -1) return;
      state.letters[index].content = content;
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
export const selectLetters = (store) => store.letterReducer.letters;
export const selectLetter = (id) => (store) => {
  console.log(store.letterReducer.letters);
  return store.letterReducer.letters.find(
    (letter) => letter.id.toString() === id.toString(),
  );
};

export default letterSlice.reducer;
