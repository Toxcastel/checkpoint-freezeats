import axios from "axios";
import {
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const getAdmin = createAsyncThunk("LOG_ADMIN", async () => {
    const { status } = await axios.get("/api/admin/");
    if (status === 200) return {logged: true};
});

const adminLogReducer = createReducer({logged: false}, {
    [getAdmin.fulfilled]: (state, action) => {
        state.pending = false;
        state.fulfilled = true;
        return action.payload},
    [getAdmin.rejected]: (state, action) => {state.rejected = true},
    [getAdmin.pending]: (state, action) => {state.pending = true},
});

export default adminLogReducer;
