import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notiReducer from "./slices/notificationSlice";
import contractReducer from "./slices/contractSlice";

export const store = configureStore({
  reducer: {
    contract: contractReducer.reducer,
    auth: authReducer.reducer,
    noti: notiReducer.reducer,
  },
});
