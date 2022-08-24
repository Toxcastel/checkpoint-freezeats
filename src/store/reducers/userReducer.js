import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const logHandler = createAsyncThunk("LOG_HANDLER", (obj) => {
    return axios.post("/api/login", obj).then(({ data }) => {
        if (data.id) {
            return data;
        } else {
            return [];
        }
    });
});

const userReducer = createReducer([], {
    [logHandler.fulfilled]: (state, action) => {
        return action.payload;
    },
});

export default userReducer;
