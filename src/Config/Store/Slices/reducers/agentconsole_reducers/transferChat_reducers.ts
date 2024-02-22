import { createSlice } from "@reduxjs/toolkit";

export interface TransferChatFormData {
  reason: string;
  assigned_to: string;
  product: string;
  sub_product: string;
  category: string;
  subCategory: string;
  remarks: string;
  department: string;
}

export interface transferChatModal {
  conv_time: any;
  hold_time: string;
  last_feedback: string;
}

export interface transferChatState {
  isLoading: boolean;
  status: string | null;
  statusMessage: string;
  data: transferChatModal | null;
  formData: TransferChatFormData | null;
}

const initialState: transferChatState = {
  isLoading: false,
  status: "",
  statusMessage: "",
  data: null,
  formData: {
    department: "",
    reason: "",
    assigned_to: "",
    product: "",
    sub_product: "",
    category: "",
    subCategory: "",
    remarks: "",
  },
};

const transferChatReducer = createSlice({
  name: "agent/transferChat",
  initialState,
  reducers: {
    resetTransferState: (state) => {
      state.isLoading = false;
      state.status = "";
      state.statusMessage = "";
      state.data = null;
      state.formData = {
        reason: "",
        assigned_to: "",
        product: "",
        sub_product: "",
        category: "",
        subCategory: "",
        remarks: "",
        department: "",
      };
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    transferChatInitialize: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    transferChatSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.statusMessage = action.payload.message;
      state.data = action.payload;
    },
    transferChatFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});

export const {
  updateFormData,
  transferChatInitialize,
  transferChatSuccess,
  transferChatFailed,
  resetTransferState,
} = transferChatReducer.actions;

export default transferChatReducer;
