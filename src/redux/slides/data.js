import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

let initialState = {
  discovery: null,
  zingchart: null,
  top100: null,
};
export default createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setDiscovery: (state, action) => {
      state.discovery = action.payload;
    },
    setZingchart: (state, action) => {
      state.zingchart = action.payload;
    },
    setTop100: (state, action) => {
      state.top100 = action.payload;
    },
  },
});
