import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setUserImageFailed,
  setUserImageStart,
  setUserImageSuccess,
} from "../../reducers/profile_settings/fetchImage_reducer";
import { fetchUSerImageService } from "../../services/profile_settings/fetchUserImage.service";

const fetchUserImageAction = createAsyncThunk(
  "user/image",
  async (user_id: string | any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUserImageStart());
      const response = await fetchUSerImageService(user_id);
      // console.log(response, "RESPONSE");
      const blob = new Blob([response], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      // debugger;
      dispatch(setUserImageSuccess(imageUrl));
    } catch (error: any) {
      dispatch(
        setUserImageFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);
export default fetchUserImageAction;
