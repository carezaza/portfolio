import { createSlice } from "@reduxjs/toolkit";

const portSlice = createSlice({
  name: "port",
  initialState: {
    port: null,
  },
  reducers: {
    setPort(state, action) {
      state.port = action.payload;
    },
  },
});

export const { setPort } = portSlice.actions;

export default portSlice.reducer;
