import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    displayModal: (state) => {
      state.value = true;
    },
    hideModal: (state) => {
      state.value = false;
    },
  },
});

export const { displayModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
