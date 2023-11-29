import authReducer from "./auth/authSlice.js";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
