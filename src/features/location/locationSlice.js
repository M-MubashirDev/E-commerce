import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: { address: "", city: "", phone: "", lat: 0, lng: 0 },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = { ...state.location, ...action.payload };
    },
    clearLocation: (state) => {
      state.location = initialState.location;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
