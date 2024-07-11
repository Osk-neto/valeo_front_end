import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

let initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const persistedState = localStorage.getItem("authState");
if (persistedState) {
  initialState = JSON.parse(persistedState);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("authState", JSON.stringify(state)); // Persistir estado
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authState"); // Remover estado persistido
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
