import { createSlice } from "@reduxjs/toolkit";

export interface getTranscriptSummaryState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: []; // Use a specific interface for the session data
}

const initialState: getTranscriptSummaryState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: [],
};

const getTranscriptSummaryReducer = createSlice({
  name: "getTranscriptSummary",
  initialState,
  reducers: {
    getTranscriptSummaryInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getTranscriptSummarySuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getTranscriptSummaryFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getTranscriptSummaryInitialize,
  getTranscriptSummarySuccess,
  getTranscriptSummaryFailed,
} = getTranscriptSummaryReducer.actions;

export default getTranscriptSummaryReducer;
