import { createSlice } from "@reduxjs/toolkit";

export const voteFilterSlice = createSlice({
  name: "voteFilter",
  initialState: {
    value: "latest",
  },
  reducers: {
    setVoteFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVoteFilter } = voteFilterSlice.actions;

export default voteFilterSlice.reducer;
