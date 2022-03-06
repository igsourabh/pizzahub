import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./cartSlice";
export const store = configureStore({
  reducer: {
   cart: cartreducer,
  },
});
