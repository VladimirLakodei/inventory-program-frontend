import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchActs = createAsyncThunk('/acts/fetchActs', async () => {
    const { data } = await axios.get('/acts');
    return data;
});

const initialState = {
    acts: {
        list: [],
        status: 'loading'
    },
}

const actsSlice = createSlice({
    name: 'acts',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchActs.pending]: (state) => {
            state.acts.list = [];
            state.acts.status = 'loading';
        },
        [fetchActs.fulfilled]: (state, action) => {
            state.acts.list = action.payload;
            state.acts.status = 'loaded';
        },
        [fetchActs.rejected]: (state) => {
            state.acts.list = [];
            state.acts.status = 'errored';
        },
    }
});

export const actsReducer = actsSlice.reducer;
