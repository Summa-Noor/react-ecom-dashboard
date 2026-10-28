import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { sidebarOpen: false, toast: null },   // toast: { type, message }
  reducers: {
    toggleSidebar(state) { state.sidebarOpen = !state.sidebarOpen; },
    closeSidebar(state) { state.sidebarOpen = false; },
    showToast(state, { payload }) { state.toast = payload; },
    hideToast(state) { state.toast = null; },
  },
});

export const { toggleSidebar, closeSidebar, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
