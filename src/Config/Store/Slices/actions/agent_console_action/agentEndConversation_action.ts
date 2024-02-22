import { createAsyncThunk } from "@reduxjs/toolkit";
import agentEndConversationService from "../../services/agentchat_services/agentEndConversation_services";
import {
  agentEndConversationFailed,
  agentEndConversationInitialize,
  agentEndConversationSuccess,
} from "../../reducers/agentconsole_reducers/agentEndConversation_reducers";

const agentEndConversationAction = createAsyncThunk(
  "agent/endcoversation",
  async (conv_session_id: any | null, { dispatch }) => {
    console.log(conv_session_id, "THUNK");
    try {
      dispatch(agentEndConversationInitialize());

      const response: any = await agentEndConversationService(conv_session_id);
      dispatch(agentEndConversationSuccess(response));
    } catch (error: any) {
      dispatch(
        agentEndConversationFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default agentEndConversationAction;
