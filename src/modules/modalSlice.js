import { createSlice } from "@reduxjs/toolkit";

export const TYPE_CONFIRM = "confirm";
export const TYPE_ALERT = "alert";

const initialState = {
  isModalOpen: false,
  openType: "alert",
  name: "",
  content: "",
  errorContent: "",
  onConfirm: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state = {
        isModalOpen: true,
        ...action.payload,
      };
    },
    closeModal: (state) => {
      state = initialState;
    },
    handleConfirm: (state) => {
      if (state.onConfirm) state.onConfirm();
      state = initialState;
    },
  },
});

export const { openModal, closeModal, handleConfirm } = modalSlice.actions;

export const selectModalState = (store) => store.modalReducer;

export default modalSlice.reducer;
