import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name : "notificationAction",
    initialState : {
        showNoti : false,
        heading : "",
        message : ""
    },
    reducers : {
        enableNotification(state,actions){
            state.showNoti = true;
            state.heading = actions.payload.heading;
            state.message = actions.payload.message;
        },
        disableNotification(state,actions){
            state.showNoti = false;
            state.heading = "";
            state.message = "";
        }
    }
})
export const notificationAction = notificationSlice.actions;
export default notificationSlice;