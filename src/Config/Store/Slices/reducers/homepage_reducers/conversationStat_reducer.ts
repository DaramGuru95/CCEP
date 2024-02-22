import { createSlice } from "@reduxjs/toolkit";

export interface ConversationStat {
  average_time_conv: string;
  total_no_of_call: string;
  total_no_of_chat: string;
  total_no_of_conv: string;
  total_no_of_email: string;
  total_no_of_messenger: string;
  total_no_of_telegram: string;
  total_no_of_whats_app: string;
  total_duration_conv: string;
  total_no_of_conv_trustt_customer_app: string | null;
}

export interface ConversationStatState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: ConversationStat | null;
}

const initialState: ConversationStatState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getConversationStatReducer = createSlice({
  name: "emp/shift",
  initialState,
  reducers: {
    getConversationStatInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getConversationStatSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getConversationStatFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getConversationStatInitialize,
  getConversationStatSuccess,
  getConversationStatFailed,
} = getConversationStatReducer.actions;

export default getConversationStatReducer;
