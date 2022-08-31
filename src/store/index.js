import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import adminUsersReducer from "./reducers/adminUsersReducer";
import setViewsReducer from "./reducers/setViewsReducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer,
        products,
        loading: loadingReducer,
        adminUsers: adminUsersReducer,
        views: setViewsReducer,
    },
});

export default store;
