import { createSlice } from "@reduxjs/toolkit";
import { notificationAction } from "./notificationSlice";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
        userData: {},        
        name: '',
        user_id: ''
    },
    reducers: {
        login(state, action) {
            state.loggedIn = true;
            state.userData = action.payload.userData;
            // store token in localstorage
            localStorage.setItem("userData", (action.payload.userData.email));
            state.isFarmer = action.payload.userData.isFarmer;
            state.name = action.payload.userData.name;
            state.user_id = action.payload.userData._id;
        },
        logout(state, action) {
            state.loggedIn = false;
            // remove from localstorage
            localStorage.removeItem("userData");
        }
    }
});
export const authActions = authSlice.actions;

export const signup = (data) => {
    return async (dispatch) => {
        dispatch(notificationAction.enableNotification({
            message: "Registering User !",
            heading: "Pending"
        }))
        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }) 
        console.log(response);
        if (!response.ok) {
            dispatch(notificationAction.enableNotification({
                message: "User notification registration failed !",
                heading: "Failed"
            }));
            setTimeout(() => {
                dispatch(notificationAction.disableNotification());
            }, 2000);
        }
        else {
            dispatch(notificationAction.enableNotification({
                message: "User registered successfully !",
                heading: "Success"
            }));
            setTimeout(() => {
                dispatch(notificationAction.disableNotification());
            }, 2000);
            
        }
    }
}

export default authSlice;