import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteLetterThunk } from "./letterSlice";

export const TYPE_CONFIRM = "confirm";
export const TYPE_ALERT = "alert";

export const DELETE_LETTER = "modal/deleteLetter";

const initialState = {
  isModalOpen: false,
  openType: "alert",
  name: "",
  content: "",
  errorContent: "",
  confirmAction: null,
};

export const handleConfirmThunk = createAsyncThunk(
  "modal/handleConfirm",
  (payload, thunkAPI) => {
    const { confirmAction } = thunkAPI.getState().modalReducer;
    switch (confirmAction.type) {
      case DELETE_LETTER:
        thunkAPI.dispatch(deleteLetterThunk(confirmAction.payload));
        break;
      default:
        break;
    }
    return;
  },
);

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (_, action) => {
      return {
        isModalOpen: true,
        ...action.payload,
      };
    },
    closeModal: () => {
      return { ...initialState };
    },
  },
  extraReducers: {
    [handleConfirmThunk.fulfilled]: (state, action) => {
      state = initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (store) => store.modalReducer;

export default modalSlice.reducer;
