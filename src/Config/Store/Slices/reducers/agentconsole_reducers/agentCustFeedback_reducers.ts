import { createSlice } from "@reduxjs/toolkit";

export interface FeedbackFormData {
  conv_time?: string;
  hold_time?: string;
  last_feedback?: string;
  status: string | null;
  remarks: string | null;
  resolve: string | null;
  selectedRating: string | null;
  reason: string | null;
}

export interface AgentCustFeedbackModal {
  conv_time: any;
  hold_time: string;
  last_feedback: string;
}

export interface AgentCustFeedbackState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: AgentCustFeedbackModal | null;
  formData: FeedbackFormData | null;
  sendSuccess: string | null;
}

const initialState: AgentCustFeedbackState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
  formData: {
    status: "",
    selectedRating: "",
    remarks: "",
    resolve: "",
    reason: "",
  },
  sendSuccess: "",
};

const getAgentCustFeedbackReducer = createSlice({
  name: "cust/feedback",
  initialState,
  reducers: {
    getAgentCustFeedbackInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getAgentCustFeedbackSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    sendAgentCustFeedbackSuccess: (state, action) => {
      state.isLoading = false;
      state.sendSuccess = "success";
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.formData = {
        status: "",
        selectedRating: "",
        remarks: "",
        resolve: "",
        reason: "",
      };
    },
    getAgentCustFeedbackFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.sendSuccess = "failed";

      state.statusMessage = action.payload;
    },
    resetFeedbackState: (state) => {
      state.isLoading = false;
      state.status = "";
      state.statusMessage = "";
      state.data = null;
      state.formData = {
        status: "",
        selectedRating: "",
        remarks: "",
        resolve: "",
        reason: "",
      };
    },
    updateFeedbackFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const {
  getAgentCustFeedbackInitialize,
  getAgentCustFeedbackSuccess,
  getAgentCustFeedbackFailed,
  resetFeedbackState,
  updateFeedbackFormData,
  sendAgentCustFeedbackSuccess,
} = getAgentCustFeedbackReducer.actions;

export default getAgentCustFeedbackReducer;
