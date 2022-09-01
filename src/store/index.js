import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import adminUsersReducer from "./reducers/adminUsersReducer";
import setViewsReducer from "./reducers/setViewsReducer";
import adminProductsReducer from "./reducers/adminProductsReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer,
        products,
        loading: loadingReducer,
        adminUsers: adminUsersReducer,
        adminProducts: adminProductsReducer,
        views: setViewsReducer,
    },
});

export default store;
