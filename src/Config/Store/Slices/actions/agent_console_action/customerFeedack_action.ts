import { createAsyncThunk } from "@reduxjs/toolkit";

import getAgentCustFeedbackService, {
  sendAgentCustFeedbackService,
} from "../../services/agentchat_services/agentCustfeedback_services";
import {
  getAgentCustFeedbackFailed,
  getAgentCustFeedbackInitialize,
  getAgentCustFeedbackSuccess,
  sendAgentCustFeedbackSuccess,
} from "../../reducers/agentconsole_reducers/agentCustFeedback_reducers";

const customerFeedbackAction = createAsyncThunk(
  "cust/feedback",
  async (conv_session_id: string | null, { dispatch }) => {
    console.log(conv_session_id, "THUNK");
    try {
      dispatch(getAgentCustFeedbackInitialize());

      const response: any = await getAgentCustFeedbackService(conv_session_id);
      dispatch(getAgentCustFeedbackSuccess(response));
    } catch (error: any) {
      dispatch(
        getAgentCustFeedbackFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default customerFeedbackAction;

export const sendCustomerFeedbackAction = createAsyncThunk(
  "cust/feedback",
  async (conv_session_id: string | null, { dispatch, getState }: any) => {
    console.log(conv_session_id, "THUNK");
    try {
      dispatch(getAgentCustFeedbackInitialize());

      const response: any = await sendAgentCustFeedbackService(
        conv_session_id,
        getState()?.getAgentCustFeedbackReducer.formData
      );
      dispatch(sendAgentCustFeedbackSuccess(response));
    } catch (error: any) {
      dispatch(
        getAgentCustFeedbackFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);
