import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import category from "./reducers/categoryReducer";
import allProducts from "./reducers/allProductsReducer";
import cart from "./reducers/cartReducer";
import cartShow from "./reducers/cartShowReducer";
import order from "./reducers/orderReducer";
import adminUsersReducer from "./reducers/adminUsersReducer";
import setViewsReducer from "./reducers/setViewsReducer";
import adminProductsReducer from "./reducers/adminProductsReducer";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    products,
    loading: loadingReducer,
    category,
    allProducts,
    cart,
    cartShow,
    order,
    adminUsers: adminUsersReducer,
    adminProducts: adminProductsReducer,
    views: setViewsReducer,
  },
});

export default store;
