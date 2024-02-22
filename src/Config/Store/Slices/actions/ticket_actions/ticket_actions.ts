import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTicketService,
  deleteTicketService,
  getTicketsService,
  updateTicketservice,
} from "../../services/Tickets_services/ticket_services";
import {
  TicketState,
  createTicketFailed,
  createTicketInitialize,
  createTicketSuccess,
} from "../../reducers/ticket_reducers/createTicket_reducer";
import {
  updateTicketFailed,
  updateTicketInitialize,
  updateTicketSuccess,
} from "../../reducers/ticket_reducers/updateTicket_reducer";
import {
  getTicketsFailed,
  getTicketsInitialize,
  getTicketsSuccess,
} from "../../reducers/ticket_reducers/getTicket_reducer";
import { showAlert } from "../../reducers/alerts";
import { getLocalStorage } from "../../../../../Helpers/commonHelper";
import { ticketStatusDetails } from "../../../../../Pages/Tickets/Components/TicketsHome/TicketDetailsObj";
import { currentTicketDetails } from "../../reducers/ticket_reducers/currentTicket_reducer";
// import { AppDispatch, RootState } from "../../..";

export const createTicketAction = createAsyncThunk(
  "ticket/createTicket",
  async (_, { dispatch, getState }: any) => {
    // console.log(getState()?.createTicket.postTicketDetails,"STATE");

    try {
      dispatch(createTicketInitialize());
      const conv_session_id = getLocalStorage("conv_session_id");
      console.log(conv_session_id, "conv_session_id");

      const response = await createTicketService({
        conv_session_id,
        ...getState()?.createTicket.postTicketDetails,
      });

      dispatch(createTicketSuccess(response));
      if (conv_session_id) dispatch(getTicketsAction(conv_session_id));
    } catch (error: any) {
      dispatch(
        createTicketFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export const getTicketsAction = createAsyncThunk(
  "ticket/getTickets",
  async (conv_session_id: number | string, { dispatch, getState }: any) => {
    try {
      dispatch(getTicketsInitialize());
      const agent_id = getState()?.appState.emp_id;
      // const response = await getTicketsService(conv_session_id);
      const response = await getTicketsService(agent_id);
      dispatch(getTicketsSuccess(response));
    } catch (error: any) {
      dispatch(
        getTicketsFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export const updateTicketAction = createAsyncThunk(
  "ticket/updateTicket",
  async (updatedData: any, { dispatch }) => {
    try {
      dispatch(updateTicketInitialize());
      const response = await updateTicketservice(updatedData);
      console.log(response, "RESPONSE");

      dispatch(updateTicketSuccess(response));
    } catch (error: any) {
      dispatch(
        updateTicketFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export const deleteTicketAction = createAsyncThunk(
  "ticket/deleteTicket",
  async (ticket_id: [], { dispatch }) => {
    try {
      // dispatch(deleteTicketService());
      const response = await deleteTicketService(ticket_id);
      console.log(response, "RESPONSE");

      dispatch(updateTicketSuccess(response));
    } catch (error: any) {
      dispatch(
        updateTicketFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export const getCurrentTicketDetailsAction = createAsyncThunk(
  "tickets/getSingleTicket",
  async (ticketDetails: any, { dispatch }) => {
    console.log(ticketDetails, "TICKETDETAILS");

    dispatch(currentTicketDetails(ticketDetails));
  }
);
