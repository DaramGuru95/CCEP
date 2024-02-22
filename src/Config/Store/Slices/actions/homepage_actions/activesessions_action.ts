import { createAsyncThunk } from "@reduxjs/toolkit";
import acticeSessionsService from "../../services/homepage_services/active_sessions_services";
import {
  activeListSuccess,
  activeSessionFailed,
  activeSessionInitialize,
  activeSessionSuccess,
  archieveSession,
} from "../../reducers/homepage_reducers/activesessions_reducer";

export const getActiveSessionAction = createAsyncThunk(
  "activesession/agent",
  async (function_code: string | null, { dispatch, getState }: any) => {
    const { emp_id, designation } = getState()?.appState;

    try {
      dispatch(activeSessionInitialize());

      const response = await acticeSessionsService(
        emp_id,
        function_code,
        designation
      );
      if (function_code == "ARCHIVE") {
        dispatch(archieveSession({ designation, ...response }));
      } else if (function_code == "ACTIVE") {
        dispatch(activeListSuccess({ designation, ...response }));
      } else {
        dispatch(activeSessionSuccess({ designation, ...response }));
      }
    } catch (error: any) {
      dispatch(
        activeSessionFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getActiveSessionAction;
