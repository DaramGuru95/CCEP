import { createSlice } from "@reduxjs/toolkit";

export interface CustConvHistoryModal {
  time: string;
  category: string;
  agent_name: string;
  conv_session_id: string | null;
}

export interface CustConvHistoryState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: CustConvHistoryModal[] | null;
}

const initialState: CustConvHistoryState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getCustConvHistoryReducer = createSlice({
  name: "cust/cust_history",
  initialState,
  reducers: {
    getCustConvHistoryInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getCustConvHistorySuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getCustConvHistoryFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getCustConvHistoryInitialize,
  getCustConvHistorySuccess,
  getCustConvHistoryFailed,
} = getCustConvHistoryReducer.actions;

export default getCustConvHistoryReducer;
