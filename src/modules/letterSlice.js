import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonServerInstance from "api/serverInstance";
import _ from "lodash";
import defaultAvatar from "../assets/img/default-avatar.png";
import { signOut } from "./auth/authSlice";

const initialState = {
  letters: [],
  selectedMemberName: "카리나",
  error: null,
  isLoading: false,
};

const handleThunkError = (err, thunkAPI) => {
  thunkAPI.dispatch(signOut());
  return thunkAPI.rejectWithValue(err);
};

export const fetchLettersThunk = createAsyncThunk(
  "letter/fetchLetterThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonServerInstance.get(
        "/letters?_sort=createdAt&_order=desc",
      );
      return response.data;
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  },
);

export const createLetterThunk = createAsyncThunk(
  "letter/createLetterThunk",
  async (payload, thunkAPI) => {
    try {
      const { userId, nickname, content, selectedMemberName, avatar } = payload;
      const newLetter = {
        nickname,
        content,
        writedTo: selectedMemberName,
        avatar: avatar || defaultAvatar,
        createdAt: Date.now(),
        userId,
      };

      const response = await jsonServerInstance.post("/letters", newLetter);
      thunkAPI.dispatch(createLetter(response.data));

      return payload;
    } catch (err) {
      return handleThunkError(err, thunkAPI);
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
      return handleThunkError(err, thunkAPI);
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
      return handleThunkError(err, thunkAPI);
    }
  },
);

// 어떻게 해야 처음에 letterSlice가 들어올 때 맨 처음에 데이터를 가져올까?
const isEqualId = (targetId) => (sourceId) => _.isEqual(targetId, sourceId);

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    createLetter: (state, action) => {
      state.letters = [action.payload, ...state.letters];
    },
    updateLetter: (state, action) => {
      const { id, content } = action.payload;
      const index = _.findIndex(state.letters, isEqualId(id));

      if (index === -1) return;
      state.letters[index].content = content;
    },
    deleteLetter: (state, action) => {
      const { id } = action.payload;
      const index = _.findIndex(state.letters, isEqualId(id));

      if (index !== -1) return;
      state.letters.splice(index, 1);
    },
    setSelectedMemberName: (state, action) => {
      state.selectedMemberName = action.payload;
    },
    clearLetterState: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchLettersThunk.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    [fetchLettersThunk.fulfilled]: (state, action) => {
      state.letters = action.payload;
      state.isLoading = false;
    },
    [fetchLettersThunk.rejected]: (state, action) => {
      state.error =
        action.payload?.response.data.message ||
        "네트워크 통신에 실패했습니다.";
      state.isLoading = false;
    },
  },
});

export const {
  createLetter,
  updateLetter,
  deleteLetter,
  setSelectedMemberName,
  clearLetterState,
} = letterSlice.actions;

export const selectMemberName = (store) =>
  store.letterReducer.selectedMemberName;
export const selectLetters = (store) => store.letterReducer.letters;
export const selectLetter = (id) => (store) => {
  return store.letterReducer.letters.find(
    (letter) => letter.id.toString() === id.toString(),
  );
};
export const selectLetterState = (store) => store.letterReducer;

export default letterSlice.reducer;
