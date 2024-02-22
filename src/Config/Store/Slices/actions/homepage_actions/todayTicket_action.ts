import { createAsyncThunk } from "@reduxjs/toolkit";
import getTodayTicketService from "../../services/homepage_services/todayTicket_services";
import {
  getTodayTicketFailed,
  getTodayTicketInitialize,
  getTodayTicketSuccess,
} from "../../reducers/homepage_reducers/todayTicekt_reducer";

const getTodayTicketAction = createAsyncThunk(
  "emp/todayticket",
  async (_, { dispatch,getState }:any) => {
    
    const {emp_id} =  getState()?.appState

    try {
      dispatch(getTodayTicketInitialize());

      const response: any = await getTodayTicketService(emp_id);
      dispatch(getTodayTicketSuccess(response));
    } catch (error: any) {
      dispatch(
        getTodayTicketFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default getTodayTicketAction;
