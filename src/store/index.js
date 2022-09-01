import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import cart from "./reducers/cartReducer"
import cartShow from "./reducers/cartShowReducer"
import order from "./reducers/orderReducer"

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer,
        products,
        loading: loadingReducer,
        cart,
        cartShow,
        order,
    },
});

export default store;
