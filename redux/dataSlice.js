// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    loginobject: {},
  },
  reducers: {
    loginObject: (state, action) => {
      state.loginobject = action.payload;
    },
  },
});

export const { loginObject } = dataSlice.actions;
export default dataSlice.reducer;
