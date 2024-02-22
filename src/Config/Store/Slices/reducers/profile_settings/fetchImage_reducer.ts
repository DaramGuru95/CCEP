import { createSlice } from "@reduxjs/toolkit";

interface userImage {
  isLoading: boolean;
  status: string;
  userImage: any;
  statusMessage: any;
}

const initialState = {
  isLoading: false,
  status: "",
  userImage: "",
  statusMessage: "",
};

const userImageReducer = createSlice({
  name: "setting/userImage",
  initialState,
  reducers: {
    setUserImageStart: (state) => {
      state.isLoading = true;
      state.status = "";
    },
    setUserImageSuccess: (state, action) => {
      state.isLoading = false;
      state.userImage = action.payload;
    },
    setUserImageFailed: (state, action) => {
      state.isLoading = false;
      state.status = "failed";
      state.statusMessage = action.payload;
    },
  },
});
export const { setUserImageSuccess, setUserImageStart, setUserImageFailed } =
  userImageReducer.actions;
export default userImageReducer;
