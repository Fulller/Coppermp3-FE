import { configureStore } from "@reduxjs/toolkit";
import dataSlide from "./slides/data";

export default configureStore({
  reducer: {
    data: dataSlide.reducer,
  },
});
