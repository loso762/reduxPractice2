import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { showCart: true, notification: null },
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    shownotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice;
