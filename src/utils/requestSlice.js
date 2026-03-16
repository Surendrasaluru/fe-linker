import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: () => null,
    removeRequestFromList: (state, action) => {
      // action.payload will be the requestId
      return state.filter((req) => req._id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest, removeRequestFromList } =
  requestSlice.actions;
export default requestSlice.reducer;
