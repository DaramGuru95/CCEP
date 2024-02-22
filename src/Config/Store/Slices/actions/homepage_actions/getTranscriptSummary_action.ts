import { createAsyncThunk } from "@reduxjs/toolkit";
import getTranscriptSummaryService from "../../services/homepage_services/getTranscriptSummary_srvices";
import {
  getTranscriptSummaryFailed,
  getTranscriptSummaryInitialize,
  getTranscriptSummarySuccess,
} from "../../reducers/homepage_reducers/getTranscriptSummary_reducer";

export const getTranscriptionSummaryAction = createAsyncThunk(
  "getTranscriptSummary",
  async (
    {
      agent_id,
      conv_session_id,
    }: { agent_id: string | null; conv_session_id: string | null },
    { dispatch }
  ) => {
    try {
      dispatch(getTranscriptSummaryInitialize());

      const response = await getTranscriptSummaryService(
        agent_id,
        conv_session_id
      );

      dispatch(getTranscriptSummarySuccess(response));
    } catch (error: any) {
      dispatch(
        getTranscriptSummaryFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getTranscriptionSummaryAction;
