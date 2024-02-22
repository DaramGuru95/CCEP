import { createSlice } from "@reduxjs/toolkit";

export interface AgentEndConversationModal {
  base_branch_name: string;
  disabled: number;
  dob: string;
  education: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  marital_status: string;
  middle_name: string | null;
  mother_name: string | null;
  occupation: string;
  phone_no: string;
  residential_status: string;
  salutation: string;
}

export interface AgentEndConversationState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: AgentEndConversationModal | null;
}

const initialState: AgentEndConversationState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const agentEndConversationReducer = createSlice({
  name: "agent/endcoversation",
  initialState,
  reducers: {
    agentEndConversationInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    agentEndConversationSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    agentEndConversationFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
    agentEndConversationReset: (state) => {
      state.isLoading = true;
      state.status = "";
      state.statusMessage = "";
    },
  },
});

export const {
  agentEndConversationInitialize,
  agentEndConversationSuccess,
  agentEndConversationFailed,
  agentEndConversationReset,
} = agentEndConversationReducer.actions;

export default agentEndConversationReducer;
