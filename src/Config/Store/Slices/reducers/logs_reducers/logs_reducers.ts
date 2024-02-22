import { createSlice } from "@reduxjs/toolkit";

export interface GetLogsModal {}

export interface getLogsState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: GetLogsModal | null;
}

const initialState: getLogsState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getLogsReducer = createSlice({
  name: "emp/logs",

  initialState,
  reducers: {
    getLogsInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getLogsSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getLogsFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const { getLogsInitialize, getLogsSuccess, getLogsFailed } =
  getLogsReducer.actions;

export default getLogsReducer;
