import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
  name: "friend",
  initialState: null,
  reducers: {
    addFriend: (state, action) => action.payload,
    removeFriend: () => null,
  },
});

export const { addFriend, removeFriend } = friendSlice.actions;
export default friendSlice.reducer;
