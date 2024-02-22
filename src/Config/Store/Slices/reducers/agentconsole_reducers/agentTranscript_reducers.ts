import { createSlice } from "@reduxjs/toolkit";

export interface Conversation {
  actual_response: string | null;
  answer: string | null;
  co_piolot_session_id?: number;
  cust_session_id?: number;
  query: string;
  // conv_initiated_time: string | null;
  // conv_closed_time: string | null;
}

export interface AgentTranscriptModal {
  conv_bt_agent_copiolot: Conversation[];
  conv_bt_agent_cust: Conversation[];
  status: string;
  status_message: string;
  conv_initiated_time: string | null;
  conv_closed_time: string | null;
}

export interface AgentTranscriptState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: AgentTranscriptModal | null;
}

const initialState: AgentTranscriptState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getAgentTranscriptReducer = createSlice({
  name: "cust/transcript",
  initialState,
  reducers: {
    getAgentTranscriptInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getAgentTranscriptSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getAgentTranscriptFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getAgentTranscriptInitialize,
  getAgentTranscriptSuccess,
  getAgentTranscriptFailed,
} = getAgentTranscriptReducer.actions;

export default getAgentTranscriptReducer;
