import { configureStore } from "@reduxjs/toolkit";
import { actsReducer } from "./slices/acts";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        acts: actsReducer,
        auth: authReducer
    }
});

export default store;
