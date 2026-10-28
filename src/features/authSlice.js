import { createSlice } from "@reduxjs/toolkit";

const load = (key) => {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};

const initialState = {
  user: load("user"),                          // { name, email, password } saved at sign up
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp(state, { payload }) {
      state.user = payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    login(state, { payload }) {
      const { user } = state;
      if (user && user.email === payload.email && user.password === payload.password) {
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("isAuthenticated", "true");
      } else {
        state.isAuthenticated = false;
        state.error = user ? "Email or password is incorrect." : "No account found. Sign up first.";
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
    clearAuthError(state) { state.error = null; },
  },
});

export const { signUp, login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
