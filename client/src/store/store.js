import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "../slice/accessTokenSlice";
import isLoginSlice from "../slice/isLoginSlice";

export default configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    isLogin: isLoginSlice,
  },
});
