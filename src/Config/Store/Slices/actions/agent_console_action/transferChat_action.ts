import { createAsyncThunk } from "@reduxjs/toolkit";

import transferChatService from "../../services/agentchat_services/transferChat_services";
import {
  transferChatFailed,
  transferChatInitialize,
  transferChatSuccess,
} from "../../reducers/agentconsole_reducers/transferChat_reducers";

const transferChatAction = createAsyncThunk(
  "agent/transferChat",
  async (function_code: string | null, { dispatch, getState }: any) => {
    try {
      dispatch(transferChatInitialize());
      const agent_id = getState()?.appState.emp_id;

      const response: any = await transferChatService(
        getState()?.transferChatReducer.formData,
        agent_id,
        function_code
      );
      dispatch(transferChatSuccess(response));
    } catch (error: any) {
      console.log("asdsdsdf transfer error");
      dispatch(
        transferChatFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default transferChatAction;
