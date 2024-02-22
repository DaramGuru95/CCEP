import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getLogsFailed,
  getLogsInitialize,
  getLogsSuccess,
} from "../../reducers/logs_reducers/logs_reducers";
import getLogsAService from "../../services/logs_services/logs_services";

const getLogsAction = createAsyncThunk(
  "emp/logs",
  async (emp_id: string | null, { dispatch }) => {
    try {
      dispatch(getLogsInitialize());

      const response: any = await getLogsAService(emp_id);
      dispatch(getLogsSuccess(response));
    } catch (error: any) {
      dispatch(
        getLogsFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getLogsAction;
