import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchActItem = createAsyncThunk(
  "/act-item/fetchItem",
  async (id) => {
    if (id) {
      const { data } = await axios.get(`/acts/${id}/items/${id}`);
      return data;
    } else {
      return null;
    }
  }
);

const initialState = {
  actItem: {
    status: "loading",
  },
};

const actItem = createSlice({
  name: "act-item",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchActItem.pending]: (state) => {
      state.actItem = {};
      state.actItem.status = "loading";
    },
    [fetchActItem.fulfilled]: (state, action) => {
      state.actItem = action.payload;
      state.actItem.status = "loaded";
    },
    [fetchActItem.rejected]: (state) => {
      state.actItem = {};
      state.actItem.status = "errored";
    },
  },
});

export const actItemReducer = actItem.reducer;
