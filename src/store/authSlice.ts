import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  LoginAuthResponse,
  initialState,
} from "@/interfaces";

export interface Credentials {
  userName: string;
  passWord: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const res = await axios.post(`https://ethanol-09r4.onrender.com/api/v1/users/login`, credentials);
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginAuthResponse['data']>) => {
        state.status = "success";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred at auth slice";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
