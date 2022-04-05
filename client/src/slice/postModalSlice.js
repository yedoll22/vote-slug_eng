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

// Action creators are generated for each case reducer function
export const { displayModal, hideModal } = postModalSlice.actions;

export default postModalSlice.reducer;
