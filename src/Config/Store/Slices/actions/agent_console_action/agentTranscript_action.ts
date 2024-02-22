import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  agentEndConversationFailed,
  agentEndConversationInitialize,
  agentEndConversationSuccess,
} from "../../reducers/agentconsole_reducers/agentEndConversation_reducers";
import {
  getAgentTranscriptFailed,
  getAgentTranscriptInitialize,
  getAgentTranscriptSuccess,
} from "../../reducers/agentconsole_reducers/agentTranscript_reducers";
import agentChatTranscriptService from "../../services/agentchat_services/agentchatTranscript_services";

const agentTranscriptAction = createAsyncThunk(
  "cust/transcript",
  async (
    {
      conv_session_id,
      function_code,
    }: { conv_session_id: any | null; function_code: any | null },
    { dispatch }
  ) => {
    console.log(conv_session_id, "THUNK");
    try {
      dispatch(getAgentTranscriptInitialize());

      const response: any = await agentChatTranscriptService(
        conv_session_id,
        function_code
      );
      dispatch(getAgentTranscriptSuccess(response));
    } catch (error: any) {
      dispatch(
        getAgentTranscriptFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default agentTranscriptAction;
