import axios from "axios";
import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const logHandler = createAction("LOG_HANDLER");

export const logOut = createAction("LOG_OUT");

export const logPersist = createAsyncThunk("LOG_PERSIST", () => {
    return axios.get("/api/user/profile").then(({ data }) => {
        if (data.id) return data;
    });
});

const userReducer = createReducer(
    {},
    {
        [logHandler]: (state, action) => action.payload,
        [logOut]: (state, action) => (state = {}),
        [logPersist.fulfilled]: (state, action) => action.payload,
        [logPersist.rejected]: (state, action) => {
            state.rejected = true;
        },
    }
);

export default userReducer;
