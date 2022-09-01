import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    search: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    search: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { getProducts, search } = productsSlice.actions;

export const handleProducts = () => (dispatch) => {
  axios
    .get("/api/products")
    .then((allProducts) => {
      dispatch(getProducts(allProducts.data));
    })
    .catch((err) => console.log(err));
};

export const searchProducts = (name) => (dispatch) => {
  axios
    .get(`/api/products/search/${name}`)
    .then((productsFound) => {
      dispatch(search(productsFound.data));
    })
    .catch((err) => console.log(err));
};

export const backHome = () => (dispatch) => {
  dispatch(search([]));
};

export default productsSlice.reducer;
