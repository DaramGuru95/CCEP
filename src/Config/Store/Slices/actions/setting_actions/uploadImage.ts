import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImageApi } from "../../services/profile_settings/uploadImage.service";

const uploadImage = createAsyncThunk(
  "image/upload",
  async ({ file, user_id }: { file: File; user_id: string }) => {
    // console.log(file, user_id, "THUNK");
   
    const response = await uploadImageApi({ file, user_id });
    return response;
  }
);

export default uploadImage;
