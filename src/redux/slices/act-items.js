import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchActItems = createAsyncThunk(
  "/act-item/fetchItems",
  async (id) => {
    if (id) {
      const { data } = await axios.get(`/acts/${id}/items`);
      return data;
    } else {
      return {};
    }
  }
);

const initialState = {
  actItems: {
    status: "loading",
  },
};

const actItemsSlice = createSlice({
  name: "act-item",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchActItems.pending]: (state) => {
      state.actItems = {};
      state.actItems.status = "loading";
    },
    [fetchActItems.fulfilled]: (state, action) => {
      state.actItems = action.payload;
      state.actItems.status = "loaded";
    },
    [fetchActItems.rejected]: (state) => {
      state.actItems = {};
      state.actItems.status = "errored";
    },
  },
});

export const actItemsReducer = actItemsSlice.reducer;
