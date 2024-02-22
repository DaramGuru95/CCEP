import { createAsyncThunk } from "@reduxjs/toolkit";
import getCustomerFeedbackService from "../../services/homepage_services/customerFeedback_services";
import {
  getCustomerFeedbackFailed,
  getCustomerFeedbackInitialize,
  getCustomerFeedbackSuccess,
} from "../../reducers/homepage_reducers/cutomerFeedback_reducer";

const getCustomerFeedbackAction = createAsyncThunk(
  "emp/todayticket",
  async (_, { dispatch, getState }: any) => {
    const { emp_id, designation } = getState()?.appState;

    try {
      dispatch(getCustomerFeedbackInitialize());

      const response: any = await getCustomerFeedbackService(
        emp_id,
        designation
      );
      dispatch(getCustomerFeedbackSuccess(response));
    } catch (error: any) {
      dispatch(
        getCustomerFeedbackFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getCustomerFeedbackAction;
