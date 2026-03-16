import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import friendReducer from "./friendSlice";
import requestReducer from "./requestSlice";
import ignoredReducer from "./ignoredSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    friend: friendReducer,
    request: requestReducer,
    ignored: ignoredReducer,
  },
});

export default appStore;
