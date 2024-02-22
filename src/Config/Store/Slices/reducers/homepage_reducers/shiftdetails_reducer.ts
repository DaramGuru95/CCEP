import { createSlice } from "@reduxjs/toolkit";

export interface ShiftDetails {
  auth_status: string;
  current_availability: number;
  date: string;
  shift_timing: string[][];
}

export interface ShiftDetailsState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: ShiftDetails | null;
}

const initialState: ShiftDetailsState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getShiftDetailsReducer = createSlice({
  name: "emp/shift",
  initialState,
  reducers: {
    getShiftDetailsInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getShiftDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getShiftDetailsFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getShiftDetailsInitialize,
  getShiftDetailsSuccess,
  getShiftDetailsFailed,
} = getShiftDetailsReducer.actions;

export default getShiftDetailsReducer;
