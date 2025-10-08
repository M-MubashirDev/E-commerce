import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: { address: null, lng: 0, lat: 0 },
  details: {
    houseNumber: "",
    streetDetails: "",
    landmark: "",
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setLocation, setDetails } = locationSlice.actions;
export default locationSlice.reducer;
