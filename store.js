import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import contractReducer from "./slices/contractSlice";

export const store = configureStore({
  reducer: {
    contract: contractReducer.reducer,
    auth: authReducer.reducer,
    notificationSlice: notificationReducer.reducer,
  },
});
