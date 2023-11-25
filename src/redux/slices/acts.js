import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchActs = createAsyncThunk("/acts/fetchActs", async () => {
  const { data } = await axios.get("/acts");
  return data;
});

export const fetchRemoveAct = createAsyncThunk(
  "/acts/fetchRemoveAct",
  async (id) => {
    const { data } = await axios.delete(`/acts/${id}`);
    return { ...data, id };
  }
);

const initialState = {
  acts: {
    list: [],
    status: "loading",
  },
};

const actsSlice = createSlice({
  name: "acts",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchActs.pending]: (state) => {
      state.acts.list = [];
      state.acts.status = "loading";
    },
    [fetchActs.fulfilled]: (state, action) => {
      state.acts.list = action.payload;
      state.acts.status = "loaded";
    },
    [fetchActs.rejected]: (state) => {
      state.acts.list = [];
      state.acts.status = "errored";
    },
    [fetchRemoveAct.pending]: (state) => {
      state.acts.status = "loading";
    },
    [fetchRemoveAct.fulfilled]: (state, action) => {
      state.acts.list = state.acts.list.filter(
        (act) => act._id !== action.payload.id
      );
      state.acts.status = "loaded";
    },
    [fetchRemoveAct.rejected]: (state) => {
      state.acts.status = "errored";
    },
  },
});

export const actsReducer = actsSlice.reducer;
