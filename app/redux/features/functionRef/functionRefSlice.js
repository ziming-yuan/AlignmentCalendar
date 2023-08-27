'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reference: null // Initial reference to the function
};

export const functionRefSlice = createSlice({
  name: 'functionRef',
  initialState,
  reducers: {
    setReference: (state, action) => {
      state.reference = action.payload.reference;
      state.arguments = action.payload.arguments;
    },
    callFunction: (state) => {
      if (state.reference) {
        state.reference(...state.arguments); // Call the referenced function with stored arguments
      }
    }
  }
});

export const { setReference, callFunction } = functionRefSlice.actions;

export default functionRefSlice.reducer;