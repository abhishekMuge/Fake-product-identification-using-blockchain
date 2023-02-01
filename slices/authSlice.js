import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import Swal from "sweetalert2";

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
    console.log("Pending");
    const response = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    console.log(json);
    if (json.status == 400) {
      Swal.fire({
        position: "bottom-end",
        icon: "failed",
        title: "User Registration Failed",
        showConfirmButton: false,
        timer: 2500,
      });
      console.log(json.message);

      Router.push("/auth/login");
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "User Registration Successfully",
        showConfirmButton: false,
        timer: 2500,
      });
      console.log("Success");
      Router.push("/auth/login");
    }
  };
};

export const signin = (data) => {
  return async (dispatch) => {
    console.log("Logging in");
    console.log(data);
    let response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    console.log(json);
    console.log(response);
    if (!response.ok) {
      console.log("User Login failed");
      Swal.fire({
        position: "bottom-end",
        icon: "failed",
        title: "User Login Failed",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "User Logged In",
        showConfirmButton: false,
        timer: 2500,
      });
      console.log("User Login Successfull");
      dispatch(authActions.login({ userData: json.data.user }));
      Router.push("/products");
    }
  };
};

export default authSlice;
