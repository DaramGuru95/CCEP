import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteLocalStorage } from "../../../../Helpers/commonHelper";

// Define the type for your authentication state
type AuthState = {
  client_id: string | null; // Adjust the type based on what type client_id is
  isAuthenticated: boolean;
  user_id: string | null;
  isLoading: boolean;
  designation: string | null;
  status: string;
  message: string;
  emp_id: string | null;

  auth_status: string | null;
};

// Define the initial state
const initialState: AuthState = {
  client_id: null,
  user_id: null,
  emp_id: null,
  isAuthenticated: false,
  designation: null,
  isLoading: false,
  status: "",
  message: "",

  auth_status: "",
};

// Create the authentication slice
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
    },

    resetWarnMessage: (state) => {
      state.message = "";
    },
    logoutSuccess: (state, action) => {
      // if (action.payload.data.auth_status === "SUCCESS") {
      state.isAuthenticated = false;
      state.client_id = null;
      state.user_id = null;
      state.emp_id = null;
      state.designation = null;
      state.status = "";
      state.message = "";
      state.designation = "";
      // }
      deleteLocalStorage("agent_page");
      deleteLocalStorage("selected_customer");
      deleteLocalStorage("agent_page_status");
      deleteLocalStorage("conv_session_id");
    },

    loginSuccess: (
      state,

      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      if (action.payload.auth_status === "SUCCESS") {
        state.isAuthenticated = true;
        state.client_id = action.payload.emp_id;
        state.user_id = action.payload.user_id;
        state.emp_id = action.payload.emp_id;
        state.designation = action.payload.designation;
        state.status = "";
        state.message = "";
        state.designation = action.payload.designation;
      } else {
        state.isAuthenticated = false;
        state.status = "error";
        state.message = action.payload.message;
      }
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
    },
    loginFailure: (
      state,
      action: PayloadAction<{ status: string; message: string }>
    ) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  resetWarnMessage,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice;
