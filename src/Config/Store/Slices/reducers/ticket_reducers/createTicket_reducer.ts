import { createSlice } from "@reduxjs/toolkit";

export interface TicketState {
  product: string;
  sub_product: string;
  category: string;
  sub_category: string;
  assign: string;
  priority: string;
  subject: string;
  status: string;
  description: string;
  alt_ctct_number: string;
  alt_email: string;
  tat: string;
  channel: string;
}

interface userDetails {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  postTicketDetails: TicketState;
}

const initialState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  postTicketDetails: {
    product: "",
    sub_product: "",
    category: "",
    sub_category: "",
    assign: "",
    priority: "",
    subject: "",
    status: "",
    description: "",
    alt_ctct_number: "",
    alt_email: "",
    tat: "",
    channel: "",
    pdf: "",
  },
};

const createTicketsReducer = createSlice({
  name: "tickets/createTicket",
  initialState,
  reducers: {
    postTicketDetailsAction: (state, action) => {
      state.postTicketDetails = action.payload;
    },

    createTicketInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
      state.statusMessage = "";
    },
    createTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
    },
    createTicketFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  createTicketInitialize,
  createTicketSuccess,
  createTicketFailed,
  postTicketDetailsAction,
} = createTicketsReducer.actions;

export default createTicketsReducer;
