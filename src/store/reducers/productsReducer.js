import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetail: {},
    search: [],
    fav: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    search: (state, action) => {
      state.search = action.payload;
    },
    addFav: (state, action) => {
      state.fav.push(action.payload)
    },
    removeFav: (state, action)=> state.fav.pop(action.payload)
  },
});

export const { getProducts, getProductDetail, search, addFav, removeFav } =
  productsSlice.actions;

export const handleProducts = (paginationNumber) => (dispatch) => {

  axios
    .get(`/api/products?pages=${paginationNumber}`)
    .then((allProducts) => {
      dispatch(getProducts(allProducts.data));
    })
    .catch((err) => console.log(err));
};


export const handleProductDetail = (product) => (dispatch) => {
  dispatch(getProductDetail(product));
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

export const addtoFav = (productId) => (dispatch) => {
  axios
    .post(`/api/fav`, {
      id: productId,
    })
    .then((prod) => {
      dispatch(addFav(prod.data));
    })
    .catch((err) => console.log(err));
};

export const removetoFav = (productId) => (dispatch) => {
  axios
    .delete(`/api/fav`, {
      id: productId,
    })
    .then(() => {
      dispatch(removeFav(productId))
    })
    .catch((err) => console.log(err));
}

export default productsSlice.reducer;
