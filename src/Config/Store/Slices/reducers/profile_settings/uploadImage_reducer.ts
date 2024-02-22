// imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import uploadImage from "../../actions/setting_actions/uploadImage";

interface ImageState {
  status: string | null;
}

const initialState: ImageState = {
  status: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = "";
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<any>) => {
        // Adjust the payload type accordingly, it might not be a string
        state.status = action.payload;
        // state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = action.error.message || "Image upload failed";
      });
  },
});

export default imageSlice;
