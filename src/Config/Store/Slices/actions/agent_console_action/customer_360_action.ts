import { createAsyncThunk } from "@reduxjs/toolkit";
import getCustomer360 from "../../services/customer360_services/customer360_services";
import {
  getCustomer360Failed,
  getCustomer360Initialize,
  getCustomer360Success,
} from "../../reducers/agentconsole_reducers/customer360_reducers";

const customer360Action = createAsyncThunk(
  "customer360/customer360Session",
  async (conv_session_id: any | null, { dispatch }) => {
    console.log(conv_session_id, "THUNK");
    try {
      dispatch(getCustomer360Initialize());

      const response: any = await getCustomer360(conv_session_id);
      dispatch(getCustomer360Success(response));
    } catch (error: any) {
      dispatch(
        getCustomer360Failed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default customer360Action;
