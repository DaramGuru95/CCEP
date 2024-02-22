import { createSlice } from "@reduxjs/toolkit";

export interface TodayTicket {
  due_today: number[][];
  open_tickets: number[][];
  overdue: number[][];
  resolved_tickets: number[][];
}

export interface TodayTicketState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: TodayTicket | null;
}

const initialState: TodayTicketState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getTodayTicketReducer = createSlice({
  name: "emp/todayticket",
  initialState,
  reducers: {
    getTodayTicketInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getTodayTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getTodayTicketFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getTodayTicketInitialize,
  getTodayTicketSuccess,
  getTodayTicketFailed,
} = getTodayTicketReducer.actions;

export default getTodayTicketReducer;
