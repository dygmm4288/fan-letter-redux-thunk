import authReducer from "./auth/authSlice.js";
import letterReducer from "./letterSlice.js";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    authReducer,
    letterReducer,
  },
});

export default store;
