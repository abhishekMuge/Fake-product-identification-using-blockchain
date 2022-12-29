import { createSlice } from "@reduxjs/toolkit";
const contractSlice = createSlice({
  name: "contract",
  initialState: {
    instance: {},
    title: "",
    connectedAddress: "",
  },
  reducers: {
    loadInstace: (state, action) => {
      // console.log("action", action);
      state.instance = action.instance;
      state.connectedAddress = action.connectedAddress;
      // return state;
      // console.log("state", state);
    },
    setName: (state, action) => {
      state.title = action.name;
      // return state;
    },
  },
});

export const contractActions = contractSlice.actions;

export const loadstates = (data) => {
  return async (dispatch) => {
    dispatch(
      contractActions.loadInstace({
        instance: data.instance,
        connectedAddress: data.connectedAddress,
      })
    );
  };
};

export default contractSlice;
