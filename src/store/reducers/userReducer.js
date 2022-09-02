import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const logHandler = createAction("LOG_HANDLER");

export const logPersist = createAsyncThunk("LOG_PERSIST", () => {
  return axios.get("/api/user/profile").then(({ data }) => {
    if (data.id) return data;
  });
});

export const logOut= createAction("LOG_OUT");

const userReducer = createReducer(
  {},
  {
    [logHandler]: (state, action) => action.payload,
    [logPersist.fulfilled]: (state, action) => action.payload,
    [logPersist.rejected]: (state, action) => {
      state.rejected = true;
    },
    [logOut.fulfilled] : (state, action)=> state = {}
  }
);

export default userReducer;
