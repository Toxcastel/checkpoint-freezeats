import axios from "axios";
import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const getAdmin = createAsyncThunk("LOG_ADMIN", async () => {
    const { status } = await axios.get("/api/admin/");
    if (status === 200) return {logged: true};
});

export const logOutAdmin = createAction("LOG_OUT", () => {
    return {logged: false}
});

const adminLogReducer = createReducer({logged: false}, {
    [getAdmin.fulfilled]: (state, action) => state = {logged: true},
    [logOutAdmin]: (state, action) => state = {logged: false},
});

export default adminLogReducer;
