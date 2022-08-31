import { createAction, createReducer } from "@reduxjs/toolkit";

export const setViews = createAction("view");

const setViewsReducer = createReducer(true, {
    [setViews]: (state, action) => action.payload,
});

export default setViewsReducer;
