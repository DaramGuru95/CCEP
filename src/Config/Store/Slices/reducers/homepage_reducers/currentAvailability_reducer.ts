import { createSlice } from "@reduxjs/toolkit";

export interface CurrentAvailabilityState {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: []; // Use a specific interface for the session data
}

const initialState: CurrentAvailabilityState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: [],
};

const getCurrentAvailabilityReducer = createSlice({
  name: "currentAvailability",
  initialState,
  reducers: {
    postCurrentAvailabilityAction: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    currentAvailabilityInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    currentAvailabilitySuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    currentAvailabilityFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  currentAvailabilityInitialize,
  currentAvailabilitySuccess,
  currentAvailabilityFailed,
  postCurrentAvailabilityAction,
} = getCurrentAvailabilityReducer.actions;

export default getCurrentAvailabilityReducer;
