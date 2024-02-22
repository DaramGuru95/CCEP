import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/auth_services/login.service";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../reducers/appState";

interface LoginCredentials {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginRequest());

      const response = await loginApi(credentials.username, credentials.password);
      const data = await response.data;
      console.log(data,"LOGINDATA");
      

      dispatch(loginSuccess(data));

      // return data;
    } catch (error: any) {
      dispatch(
        loginFailure({
          status: error?.status,
          message: error?.message ,
        })
      );

      return rejectWithValue(error);
    }
  }
);
