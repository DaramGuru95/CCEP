import { createSlice } from "@reduxjs/toolkit";

export interface CustomerFeedback {
  overall_message: string;
  overall_percentage: string;
  recent_message: string;
  recent_percentage: string;
  total_number_of_reviews: string;
}

export interface CustomerFeedbackState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: CustomerFeedback | null;
}

const initialState: CustomerFeedbackState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getCustomerFeedbackReducer = createSlice({
  name: "emp/conversationStat",
  initialState,
  reducers: {
    getCustomerFeedbackInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getCustomerFeedbackSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getCustomerFeedbackFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getCustomerFeedbackInitialize,
  getCustomerFeedbackSuccess,
  getCustomerFeedbackFailed,
} = getCustomerFeedbackReducer.actions;

export default getCustomerFeedbackReducer;
