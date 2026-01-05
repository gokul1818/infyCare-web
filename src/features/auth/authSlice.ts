import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

type UserRole = "admin" | "user" | "manager" | null;

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole;
}

interface LoginPayload {
  user: User;
  token: string;
  role: UserRole;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

export type { User, UserRole, AuthState };
