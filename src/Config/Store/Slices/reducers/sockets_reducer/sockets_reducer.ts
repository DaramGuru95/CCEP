import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export interface SocketState {
  isLoading: boolean;
  status: string | null;
  statusMessage: string;
  data: null;
  socket_agent: any;
}

const initialState: SocketState = {
  socket_agent: null,
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const socketReducer = createSlice({
  name: "agent/socket",
  initialState,
  reducers: {
    socketInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    socketSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    socketConnectSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "connected";

      state.statusMessage = action.payload.message;
      state.socket_agent = action.payload.socket;
    },
    socketFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
    transferChatAgent: (state, action) => {
      state.data = action.payload;
    },
    converseAggignToAgent: (state, action) => {
      state.data = action.payload;
    },
    resetSocketData: (state, action) => {
      state.data = null;
    },
  },
});

export const {
  socketInitialize,
  socketSuccess,
  socketFailed,
  socketConnectSuccess,
  transferChatAgent,
  converseAggignToAgent,
  resetSocketData,
} = socketReducer.actions;

export default socketReducer;
