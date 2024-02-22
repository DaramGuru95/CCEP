import { createSlice } from "@reduxjs/toolkit";

export interface Customer360Modal {
  base_branch_name: string;
  disabled: number;
  dob: string;
  education: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  marital_status: string;
  middle_name: string | null;
  mother_name: string | null;
  occupation: string;
  phone_no: string;
  residential_status: string;
  salutation: string;
  customer_id: string;
}

export interface Customer360State {
  isLoading: boolean;
  status: string;
  statusMessage: string;
  data: Customer360Modal | null;
}

const initialState: Customer360State = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
};

const getCustomer360Reducer = createSlice({
  name: "customer360/customer360Session",
  initialState,
  reducers: {
    getCustomer360Initialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    getCustomer360Success: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    getCustomer360Failed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  getCustomer360Initialize,
  getCustomer360Success,
  getCustomer360Failed,
} = getCustomer360Reducer.actions;

export default getCustomer360Reducer;
