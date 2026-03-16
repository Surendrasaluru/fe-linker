import { createSlice } from "@reduxjs/toolkit";

const ignoredSlice = createSlice({
  name: "ignored",
  initialState: null,
  reducers: {
    addIgnored: (state, action) => action.payload,
    removeIgnored: () => null,
    removeOneIgnored: (state, action) => {
      // action.payload will be the userId
      // We filter the array to keep everyone EXCEPT the one we just connected with
      return state.filter((user) => user.userId !== action.payload);
    },
  },
});

export const { addIgnored, removeIgnored, removeOneIgnored } =
  ignoredSlice.actions;
export default ignoredSlice.reducer;
