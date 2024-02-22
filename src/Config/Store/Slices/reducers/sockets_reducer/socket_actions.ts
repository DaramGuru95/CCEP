import { io } from "socket.io-client";
import {
  converseAggignToAgent,
  socketConnectSuccess,
  socketFailed,
  socketInitialize,
  transferChatAgent,
} from "./sockets_reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";

const connectToSocket = createAsyncThunk(
  "agent/socket",
  async (agent_id: string | null, { dispatch }) => {
    try {
      dispatch(socketInitialize()); // Dispatch initialization action
      const socket = io("https://dev1-trusttgpt-ccep.trustt.com"); // Connect to socket server
      socket.on("connect", () => {
        console.log("connecting agent socket");

        // Dispatch the socketConnectSuccess action after the socket is connected
        dispatch(socketConnectSuccess({ message: "Socket connected", socket }));
      });
      socket.on("make_connection", (data) => {
        console.log("connection established", data);
      });
      setInterval(() => {
        // console.log("im in intervel");
        socket.emit("heartbeat", new Date());
      }, 10000);
      socket.emit("join_chat_room", agent_id);

      socket.on("heartbeat_ack", ({ status }: any) => {
        console.log("heartbeat is coming: ", status);
        if (status == "alive") {
        } else {
          socket.emit("heartbeat", new Date());
          //   socket.emit("join_chat_room", conv_session_id);
        }
      });
      socket.on("transfer_chat_agent", (response) => {
        console.log("daisdnaisdniansdio", response);
        dispatch(transferChatAgent(response));
      });
      socket.on("conv_assign_to_agent", (response) => {
        console.log("conv_assign_to_agent", response);
        dispatch(converseAggignToAgent(response));
      });
    } catch (error) {
      dispatch(socketFailed(error)); // Dispatch failure action
    }
  }
);

export default connectToSocket;
