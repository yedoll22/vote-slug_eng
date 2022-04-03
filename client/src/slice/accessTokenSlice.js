import { createSlice } from "@reduxjs/toolkit";

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: {
    value: "",
  },
  reducers: {
    getAccessToken: (state, action) => {
      state.value = action.payload;
    },
    removeAccessToken: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
