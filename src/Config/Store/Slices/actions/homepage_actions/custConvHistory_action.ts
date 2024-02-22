import { createAsyncThunk } from "@reduxjs/toolkit";

import getCustConvHistoryService from "../../services/agentchat_services/custConvHistory_services";
import {
  getCustConvHistoryFailed,
  getCustConvHistoryInitialize,
  getCustConvHistorySuccess,
} from "../../reducers/agentconsole_reducers/custConvHistory_reducers";

const getCustConvHistoryAction = createAsyncThunk(
  "emp/cust_history",
  async (conv_session_id: string | null, { dispatch }) => {
    try {
      dispatch(getCustConvHistoryInitialize());

      const response: any = await getCustConvHistoryService(conv_session_id);
      dispatch(getCustConvHistorySuccess(response));
    } catch (error: any) {
      dispatch(
        getCustConvHistoryFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getCustConvHistoryAction;
