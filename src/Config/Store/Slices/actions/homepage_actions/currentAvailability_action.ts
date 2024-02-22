import { createAsyncThunk } from "@reduxjs/toolkit";

import  {
  postCurrentAvailabilityService,
  getCurrentAvailabilityService
} from "../../services/homepage_services/currentAvailability_services";
import {
  currentAvailabilityFailed,
  currentAvailabilityInitialize,
  currentAvailabilitySuccess,
} from "../../reducers/homepage_reducers/currentAvailability_reducer";

export const getcurrentAvailabilityAction = createAsyncThunk(
  "currentAvailability",
  async (_, { dispatch ,getState}:any) => {
    const {emp_id} =  getState()?.appState
    try {
      dispatch(currentAvailabilityInitialize());

      const response = await getCurrentAvailabilityService(emp_id);

      dispatch(currentAvailabilitySuccess(response));
    } catch (error: any) {
      dispatch(
        currentAvailabilityFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);


export const postcurrentAvailabilityAction = createAsyncThunk(
  "currentAvailability",
  async (_, { dispatch,getState }:any) => {
    
    const {emp_id} =  getState()?.appState

    try {
      dispatch(currentAvailabilityInitialize());

      const response = await postCurrentAvailabilityService(emp_id);

      dispatch(currentAvailabilitySuccess(response));
    } catch (error: any) {
      dispatch(
        currentAvailabilityFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);
