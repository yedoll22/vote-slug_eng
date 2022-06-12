import { configureStore } from "@reduxjs/toolkit";
import accessTokenSlice from "../slice/accessTokenSlice";
import isLoginSlice from "../slice/isLoginSlice";
import modalSlice from "../slice/modalSlice";
import postModalSlice from "../slice/postModalSlice";
import voteFilterSlice from "../slice/voteFilterSlice";

export default configureStore({
  reducer: {
    accessToken: accessTokenSlice,
    isLogin: isLoginSlice,
    postModal: postModalSlice,
    voteFilter: voteFilterSlice,
    modal: modalSlice,
  },
});
