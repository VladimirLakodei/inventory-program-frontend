import { configureStore } from "@reduxjs/toolkit";
import { actReducer } from "./slices/act";
import { actsReducer } from "./slices/acts";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        act: actReducer,
        acts: actsReducer,
        auth: authReducer
    }
});

export default store;
