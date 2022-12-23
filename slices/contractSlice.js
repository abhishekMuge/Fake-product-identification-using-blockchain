import { createSlice } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    instance: {},
    connectedAddress: undefined,
  },
  reducers: {
    loadInstace: (state, action) => {
      state.instance = action.instance;
      state.connectedAddress = action.connectedAddress;
    },
  },
});

export const contractActions = contractSlice.actions;
export const selectContractInstance = (state) => state.contract.instance;
export const selectConnectedAddress = (state) =>
  state.contract.connectedAddress;

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
