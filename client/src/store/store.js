import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "../slice/accessTokenSlice";
import isLoginSlice from "../slice/isLoginSlice";
import postModalSlice from "../slice/postModalSlice";

export default configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    isLogin: isLoginSlice,
    postModal: postModalSlice,
  },
});
