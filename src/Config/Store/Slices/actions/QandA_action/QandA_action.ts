import { createAsyncThunk } from "@reduxjs/toolkit";
import getQandAService from "../../services/QandA_service/QandA_services";
import {
  getQandAFailed,
  getQandAInitialize,
  getQandASuccess,
} from "../../reducers/QandA_reducers/QandA_reducer";

const getQandAAction = createAsyncThunk(
  "emp/q&a",
  async (emp_id: string | null, { dispatch }) => {
    try {
      dispatch(getQandAInitialize());

      const response: any = await getQandAService(emp_id);
      dispatch(getQandASuccess(response));
    } catch (error: any) {
      dispatch(
        getQandAFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getQandAAction;
