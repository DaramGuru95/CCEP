import { createSlice } from "@reduxjs/toolkit";

export interface SessionData {
  customer_details: {
    first_name: string;
    last_name: string;
    salutation: string;
  };
  existing_session: {
    channel: string;
    customer_id: number;
    service_type: string;
    session_duration: string;
    session_start_time: string;
    status: string;
    channel_subtype: string;
    conv_session_id: string;
    category?: string | null;
    feedback?: string | null;
    talk_time?: string | null;
  };
}

export interface ActiveSessionState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: SessionData[]; // Use a specific interface for the session data
  archieveData: SessionData[];
  activeData: SessionData[];
}

const initialState: ActiveSessionState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: [],
  archieveData: [],
  activeData: [],
};

const getActiveSessionReducer = createSlice({
  name: "activesession/agent",
  initialState,
  reducers: {
    getActiveSessionAction: (state, action) => {
      state.data = action.payload;
    },

    activeSessionInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    activeSessionSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      if (action.payload.designation === "SUPERVISOR") {
        state.data = action.payload?.agent_details;
      }
      if (action.payload.designation === "AGENT") {
        state.data = action.payload?.sessions_list;
      }
    },
    archieveSession: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      if (action.payload.designation === "SUPERVISOR") {
        state.archieveData = action.payload?.agent_details;
      }
      if (action.payload.designation === "AGENT") {
        state.archieveData = action.payload?.sessions_list;
      }
    },
    activeListSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      if (action.payload.designation === "SUPERVISOR") {
        state.activeData = action.payload?.agent_details;
      }
      if (action.payload.designation === "AGENT") {
        state.activeData = action.payload?.sessions_list;
      }
    },
    activeSessionFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  activeSessionFailed,
  activeSessionSuccess,
  activeSessionInitialize,
  getActiveSessionAction,
  activeListSuccess,
  archieveSession,
} = getActiveSessionReducer.actions;

export default getActiveSessionReducer;
