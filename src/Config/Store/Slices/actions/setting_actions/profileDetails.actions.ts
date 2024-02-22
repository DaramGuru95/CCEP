import { createAsyncThunk } from "@reduxjs/toolkit";
import { userDetailsApi } from "../../services/profile_settings/userDetails.service";
import {
  setUserDetailsStart,
  setuserDetailsFailed,
  setuserDetailsSuccess,
} from "../../reducers/profile_settings/userDetails_reducer";

const userDetailsAction = createAsyncThunk(
  "user/profileDetails",
  async (user_id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUserDetailsStart());
      const response = await userDetailsApi(user_id);
      // console.log(response, "RESPONSE");

      dispatch(setuserDetailsSuccess(response));
    } catch (error: any) {
      dispatch(
        setuserDetailsFailed({
          status: error.status,
          statusMessage: error.message || "Failed to Fetch",
        })
      );
    }
  }
);

export default userDetailsAction;
