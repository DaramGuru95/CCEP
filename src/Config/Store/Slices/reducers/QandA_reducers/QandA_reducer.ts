import { createSlice } from "@reduxjs/toolkit";

// export interface QandA {
//   auth_status: string;
//   current_availability: number;
//   date: string;
//   shift_timing: string[][];
// }

export interface QandAState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: any;
}

const initialState: QandAState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getQandAReducer = createSlice({
  name: "emp/q&a",

  initialState,
  reducers: {
    getQandAInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getQandASuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getQandAFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const { getQandAInitialize, getQandASuccess, getQandAFailed } =
  getQandAReducer.actions;

export default getQandAReducer;
