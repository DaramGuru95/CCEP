import { createAsyncThunk } from "@reduxjs/toolkit";
import getFeedbackService from "../../services/agentchat_services/getFeedback_services";
import {
  getFeedbackFailed,
  getFeedbackInitialize,
  getFeedbackSuccess,
} from "../../reducers/agentconsole_reducers/getFeedback_reducers";

const getFeedbackAction = createAsyncThunk(
  "agent/get-feedback",
  async (conv_session_id: any | null, { dispatch }) => {
    try {
      dispatch(getFeedbackInitialize());

      const response: any = await getFeedbackService(conv_session_id);
      dispatch(getFeedbackSuccess(response));
    } catch (error: any) {
      dispatch(
        getFeedbackFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getFeedbackAction;
