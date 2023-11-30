import authReducer from "./auth/authSlice.js";
import letterReducer from "./letterSlice.js";
import modalReducer from "./modalSlice.js";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    authReducer,
    letterReducer,
    modalReducer,
  },
});

export default store;
