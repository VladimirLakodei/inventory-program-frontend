import { configureStore } from "@reduxjs/toolkit";
import { actReducer } from "./slices/act";
import { actsReducer } from "./slices/acts";
import { actItemReducer } from "./slices/act-item";
import { actItemsReducer } from "./slices/act-items";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    act: actReducer,
    acts: actsReducer,
    auth: authReducer,
    actItem: actItemReducer,
    actItems: actItemsReducer,
  },
});

export default store;
