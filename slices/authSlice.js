import { createSlice } from "@reduxjs/toolkit";
import { notificationAction } from "./notificationSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    userData: {},
    name: "",
    user_id: "",
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload.userData;
      // store token in localstorage
      localStorage.setItem("userData", action.payload.userData.account_address);
      state.isCompany = action.payload.userData.isCompany;
      state.name = action.payload.userData.name;
      state.user_id = action.payload.userData._id;
    },
    logout: (state, action) => {
      state.loggedIn = false;
      // remove from localstorage
      localStorage.removeItem("userData");
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
  },
});
export const authActions = authSlice.actions;

export const signup = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationAction.enableNotification({
        message: "Registering User !",
        heading: "Pending",
      })
    );
    const response = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      dispatch(
        notificationAction.enableNotification({
          message: "User notification registration failed !",
          heading: "Failed",
        })
      );
      setTimeout(() => {
        dispatch(notificationAction.disableNotification());
      }, 2000);
    } else {
      dispatch(
        notificationAction.enableNotification({
          message: "User registered successfully !",
          heading: "Success",
        })
      );
      setTimeout(() => {
        dispatch(notificationAction.disableNotification());
      }, 2000);
    }
  };
};

export const signin = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationAction.enableNotification({
        message: "Logging In",
        heading: "Success",
      })
    );
    let response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    console.log(json);
    if (!response.ok) {
      dispatch(
        notificationAction.enableNotification({
          message: "User Login failed !",
          heading: "Failed",
        })
      );
      setTimeout(() => {
        dispatch(notificationAction.disableNotification());
      }, 2000);
    } else {
      dispatch(
        notificationAction.enableNotification({
          message: "User login Successful !",
          heading: "Success",
        })
      );
      dispatch(authActions.login({ userData: json.data.user }));
      setTimeout(() => {
        dispatch(notificationAction.disableNotification());
      }, 2000);
    }
  };
};

export default authSlice;
