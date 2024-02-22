import { createAsyncThunk } from "@reduxjs/toolkit";
import getConversationStatService from "../../services/homepage_services/conversationStat_services";
import {
  getConversationStatFailed,
  getConversationStatInitialize,
  getConversationStatSuccess,
} from "../../reducers/homepage_reducers/conversationStat_reducer";

const getConversationStatAction = createAsyncThunk(
  "emp/conversationStat",
  async (_, { dispatch,getState }:any) => {
     
    const {emp_id} =  getState()?.appState

    try {
      dispatch(getConversationStatInitialize());

      const response: any = await getConversationStatService(emp_id);
      dispatch(getConversationStatSuccess(response));
    } catch (error: any) {
      dispatch(
        getConversationStatFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getConversationStatAction;
