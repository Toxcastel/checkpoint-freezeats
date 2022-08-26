import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer,
        products, 
    },
});

export default store;
