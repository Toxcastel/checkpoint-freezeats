import axios from "axios";
import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";


export const logHandler = createAction("LOG_HANLDER");


export const logPersist = createAsyncThunk("LOG_PERSIST", () => {
    return axios.get("/api/user/profile").then(({ data }) => {
        if (data.id) return data;
    });
});

const userReducer = createReducer([], {
    [logHandler]: (state, action) => action.payload,
    [logPersist.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
