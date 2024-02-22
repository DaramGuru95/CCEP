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
  
  currentTicketDetails: any;
}

const initialState:userDetails = {
 
  currentTicketDetails: {},
};

const currentTicketDetailsReducer = createSlice({
  name: "ticket/selectedTicket",
  initialState,
  reducers: {
    currentTicketDetails: (state, action) => {
      state.currentTicketDetails = {
       ...action.payload
        }
      }
    
  },
});

export const { currentTicketDetails } = currentTicketDetailsReducer.actions;

export default currentTicketDetailsReducer;
