import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    userData: {},
    name: "",
    user_id: "",
    registerUserStatus: false,
  },
  reducers: {
    registerUserStateChange: (state, action) => {
      state.registerUserStatus = action.payload.status;
    },
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
    if (json.status == 400 || response.status == 400) {
      Swal.fire({
        position: "center",
        icon: "warning",
        html: "<b> User Register failed </b>",
        showConfirmButton: false,
        timer: 2500,
        width: 300,
      });
      dispatch(authActions.registerUserStateChange({ status: false }));
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        html: "<b> User Register Successfully</b>",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(authActions.registerUserStateChange({ status: true }));
      console.log("Success");
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
    console.log("json");
    console.log(json);
    console.log("response");
    console.log(response);
    if (json.status == 400 || response.status == 400) {
      // Router.push("/auth/login");
      console.log("User Login failed");
      Swal.fire({
        position: "center",
        icon: "warning",
        html: "<b> User Logged In failed </b>",
        showConfirmButton: false,
        timer: 2500,
        width: 300,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        html: "<b> User Logged In Successfully</b>",
        showConfirmButton: false,
        timer: 2500,
      });
      console.log("User Login Successfull");
      dispatch(authActions.login({ userData: json.data.user }));
      Router.push("/products");
    }
  };
};

export const signout = (data) => {
  return async (dispatch) => {    
    dispatch(authActions.logout());   
    Swal.fire({
      position: "center",
      icon: "success",
      html: '<b> User Logged Out Successfully</b>',
      showConfirmButton: false,
      timer: 2500,
    });
    Router.push("auth/login");
    
  };
};

export default authSlice;
