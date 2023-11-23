import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAct = createAsyncThunk("/acts/fetchAct", async (id) => {
  if (id) {
    const { data } = await axios.get(`/acts/${id}`);
    return data;
  } else {
    return {};
  }
});

const initialState = {
  act: {
    status: "loading",
  },
};

const actSlice = createSlice({
  name: "act",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchAct.pending]: (state) => {
      state.act = {};
      state.act.status = "loading";
    },
    [fetchAct.fulfilled]: (state, action) => {
      state.act = action.payload;
      state.act.status = "loaded";
    },
    [fetchAct.rejected]: (state) => {
      state.act = {};
      state.act.status = "errored";
    },
  },
});

export const actReducer = actSlice.reducer;
