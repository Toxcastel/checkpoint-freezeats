import { createAction, createReducer } from "@reduxjs/toolkit";

export const loadingHandler = createAction("LOADING");

const loadingReducer = createReducer(true, {
    [loadingHandler]: (state, action) => action.payload,
});

export default loadingReducer;
