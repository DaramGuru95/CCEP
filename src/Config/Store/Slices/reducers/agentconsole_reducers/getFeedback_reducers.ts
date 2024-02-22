import { createSlice } from "@reduxjs/toolkit";

export interface FeedbackModal {
  summary: string | null;
  resolution_status: string | null;
  conv_reason: string | null;
  STATUS: string | null;
  agent_remark: string | null;
}

export interface FeedbackState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: FeedbackModal | any;
}

const initialState: FeedbackState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getFeedbackReducer = createSlice({
  name: "agent/get-feedback",
  initialState,
  reducers: {
    getFeedbackInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getFeedbackSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getFeedbackFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const { getFeedbackInitialize, getFeedbackSuccess, getFeedbackFailed } =
  getFeedbackReducer.actions;

export default getFeedbackReducer;
