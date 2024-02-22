import { createSlice } from "@reduxjs/toolkit";

interface ModalReducerInerface {
  open: boolean;
  showAttechmentPopUp: boolean;
}

const initialState: ModalReducerInerface = {
  open: false,
  showAttechmentPopUp: false,
};

const modalState = createSlice({
  name: "modalState",
  initialState: initialState,
  reducers: {
    handelModalOpen: (state) => {
      state.open = true;
    },
    handelModalClose: (state) => {
      state.open = false;
    },
    handleShowAttechmentOpen: (state) => {
      state.showAttechmentPopUp = true;
    },
    handleShowAttechmentClose: (state) => {
      state.showAttechmentPopUp = false;
    },
  },
});

export const {
  handelModalClose,
  handelModalOpen,
  handleShowAttechmentOpen,
  handleShowAttechmentClose,
} = modalState.actions;

export default modalState;
