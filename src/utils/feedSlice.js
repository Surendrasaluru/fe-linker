import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  // Start as null to distinguish between "No Data Fetched" and "Empty Feed"
  initialState: null,

  reducers: {
    // Sets the feed array from the backend
    addFeed: (state, action) => {
      return action.payload;
    },

    // Use this when a user swipes 'Interested' or 'Ignored'
    // It filters out the specific user from the current feed array
    removeUserFromFeed: (state, action) => {
      if (!state) return null;
      return state.filter((user) => user._id !== action.payload);
    },

    // Resets the feed (useful for Logout)
    removeFeed: () => {
      return null;
    },
  },
});

export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
