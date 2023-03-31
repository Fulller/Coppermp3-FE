import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

let initialState = {
  language: "vi",
  module: {
    isShow: false,
    type: "",
    data: {},
  },
  detailcontent: {
    type: "",
    data: {},
  },
  showinfocontent: false,
};
export default createSlice({
  name: "setting",
  initialState: LocalStorare.get("setting", initialState),
  reducers: {
    setDefault: (state, action) => {
      state = initialState;
      return state;
    },
    setLanguage: (state, action) => {
      state.language = action.payload.language;
      LocalStorare.set("setting", state);
      return state;
    },
    setModule: (state, action) => {
      state.module = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
    detailcontent: (state, action) => {
      state.detailcontent = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
    toggleShowinfocontent: (state, action) => {
      state.showinfocontent = !state.showinfocontent;
      LocalStorare.set("setting", state);
      return state;
    },
  },
});
