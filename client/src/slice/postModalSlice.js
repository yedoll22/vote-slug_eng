import { createSlice } from "@reduxjs/toolkit";

export const postModalSlice = createSlice({
  name: "postModal",
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

export const { displayModal, hideModal } = postModalSlice.actions;

export default postModalSlice.reducer;
