import { createSlice } from "@reduxjs/toolkit";

interface userDetails {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: any | [{}];
  rowSelectionModel: [];
}

const initialState: userDetails = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: [{}],
  rowSelectionModel: [],
};

const getTicketDetailsReducer = createSlice({
  name: "settings/userDetails",
  initialState,
  reducers: {
    getTicketsInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getTicketsSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload.data;
    },
    getTicketsFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
    getrowSelectionModel: (state, action) => {
      return {
        ...state,
        rowSelectionModel: action.payload,
      };
    },
  },
});

export const {
  getTicketsInitialize,
  getTicketsSuccess,
  getTicketsFailed,
  getrowSelectionModel,
} = getTicketDetailsReducer.actions;

export default getTicketDetailsReducer;
