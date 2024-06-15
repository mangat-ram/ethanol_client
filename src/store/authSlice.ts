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

export const login = createAsyncThunk<LoginAuthResponse['data'], Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post<LoginAuthResponse>(`https://ethanol-09r4.onrender.com/api/v1/users/login`, credentials);
      return res.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      return rejectWithValue(errorMessage);
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
        state.error = action.payload || "An error occurred at auth slice";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
