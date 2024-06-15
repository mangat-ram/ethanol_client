import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {
  User,
  LoginAuthResponse,
  AuthState,
  initialState,
  ThunkInterface
} from "@/interfaces"

interface Credentials {
  username: string;
  password: string;
}

export const login = createAsyncThunk<LoginAuthResponse['data'], Credentials, {rejectValue: string}>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post<LoginAuthResponse>(`${process.env.SERVER_ORIGIN}/users/login`, credentials);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.res.data);
    }
  }
)

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
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginAuthResponse['data']>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = "An error occured at auth slice";
      });
  }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
