import { createSlice } from "@reduxjs/toolkit"; 
import Router from "next/router";
import Swal from 'sweetalert2'

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
<<<<<<< HEAD
    console.log("Pending");
    dispatch(
      notiAction.enableNotification({
        message: "Registering User !",
        heading: "Pending",
      })
    );
=======
    console.log("Pending")
>>>>>>> 98e0289936d17181b022376e42a98cc5303a9465
    const response = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    console.log(json);
<<<<<<< HEAD
    if (json.status == 401) {
      alert("Password not matched!");
      dispatch(
        notiAction.enableNotification({
          message: "User notification registeration failed !",
          heading: "Failed",
        })
      );
      setTimeout(() => {
        dispatch(notiAction.disableNotification());
      }, 2000);
      console.log(json.message);

      Router.push("/auth/login");
    } else {
      dispatch(
        notiAction.enableNotification({
          message: "User registered successfully !",
          heading: "Success",
        })
      );
      setTimeout(() => {
        dispatch(notiAction.disableNotification());
      }, 2000);
      console.log("Success");
      Router.push("/auth/login");
=======
    if (json.status == 400) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'failed',
        title: 'User Registration Failed',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(json.message)

      Router.push("/auth/login")
    } 
    else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'User Registration Successfully',
        showConfirmButton: false,
        timer: 2000
      })
      console.log("Success")
      Router.push("/auth/login")
>>>>>>> 98e0289936d17181b022376e42a98cc5303a9465
    }
  };
};

export const signin = (data) => {
  return async (dispatch) => {
<<<<<<< HEAD
    console.log("Logging in");
    dispatch(
      notiAction.enableNotification({
        message: "Loggin In",
        heading: "Success",
      })
    );
=======
    console.log("Logging in")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logging In',
      showConfirmButton: false,
    })
>>>>>>> 98e0289936d17181b022376e42a98cc5303a9465
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
<<<<<<< HEAD
      console.log("User Login failed");
      dispatch(
        notiAction.enableNotification({
          message: "User Login failed !",
          heading: "Failed",
        })
      );
      setTimeout(() => {
        dispatch(notiAction.disableNotification());
      }, 2000);
    } else {
      console.log("User Login Successfull");
      dispatch(
        notiAction.enableNotification({
          message: "User login Successful !",
          heading: "Success",
        })
      );
=======
      console.log("User Login failed")
      Swal.fire({
        position: 'bottom-end',
        icon: 'failed',
        title: 'User Login Failed',
        showConfirmButton: false,
        timer: 2000
      })
    } 
    else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'User Logged In',
        showConfirmButton: false,
        timer: 2000
      })
      console.log("User Login Successfull")
>>>>>>> 98e0289936d17181b022376e42a98cc5303a9465
      dispatch(authActions.login({ userData: json.data.user }));
      Router.push("/products");
    }
  };
};

export default authSlice;
