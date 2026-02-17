import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";

// ============================================
// Redux Store Configuration
// Combines all reducers into a single store
// configureStore automatically sets up Redux Thunk middleware
// ============================================
const store = configureStore({
  reducer: {
    // Weather reducer handles all weather-related state
    weather: weatherReducer,
  },
});

export default store;
