import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addcart: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addcart } = cartSlice.actions;

export default cartSlice.reducer;
