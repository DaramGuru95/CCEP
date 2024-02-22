import { createAsyncThunk } from "@reduxjs/toolkit";
import getEmpShiftDetailsService from "../../services/homepage_services/shiftdetails_services";
import {
  getShiftDetailsFailed,
  getShiftDetailsInitialize,
  getShiftDetailsSuccess,
} from "../../reducers/homepage_reducers/shiftdetails_reducer";

const getEmpShiftDetailsAction = createAsyncThunk(
  "emp/shift",
  async (_, { dispatch,getState }:any) => {
    const {emp_id}  = getState()?.appState
    try {
      dispatch(getShiftDetailsInitialize());

      const response: any = await getEmpShiftDetailsService(emp_id);
      dispatch(getShiftDetailsSuccess(response));
    } catch (error: any) {
      dispatch(
        getShiftDetailsFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getEmpShiftDetailsAction;
