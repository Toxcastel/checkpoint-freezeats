import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const logHandler = createAsyncThunk("LOG_HANDLER", (obj) => {
    return axios.post("/api/user/login", obj).then(({ data }) => {
        const { user } = data;
        if (user.id) return user;
        else return [];
    });
});

export const logPersist = createAsyncThunk("LOG_PERSIST", () => {
    return axios.get("/api/user/profile").then(({ data }) => {
        if (data.id) return data;
        else return [];
    });
});

const userReducer = createReducer([], {
    [logHandler.fulfilled]: (state, action) => action.payload,
    [logPersist.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
