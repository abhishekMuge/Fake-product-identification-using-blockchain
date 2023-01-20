import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contractReducer from "./slices/contractSlice";

export const store = configureStore({
  reducer: {
    contract: contractReducer.reducer,
    auth: authReducer.reducer,
  },
});
