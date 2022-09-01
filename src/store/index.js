import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import category from "./reducers/categoryReducer";
import allProducts from "./reducers/allProductsReducer";


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    products,
    loading: loadingReducer,
    category,
    allProducts,
  },
});

export default store;
