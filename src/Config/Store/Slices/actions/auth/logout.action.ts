import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from "../../reducers/appState";
import { logoutApi } from "../../services/auth_services/logout.service";

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (agent_id: string | null, { dispatch, rejectWithValue }) => {
    console.log("im in action logout");
    try {
      dispatch(logoutRequest());
      const data = await logoutApi(agent_id);

      dispatch(logoutSuccess(data));

      return data;
    } catch (error: any) {
      dispatch(
        logoutFailure({
          status: error?.status,
          message: error?.message,
        })
      );

      return rejectWithValue(error);
    }
  }
);
