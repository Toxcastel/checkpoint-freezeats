import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload
    }
  }
});

export const { getProducts } = productsSlice.actions

export const handleProducts = (paginationNumber) => (dispatch) => {
     axios
      .get(`/api/products?pages=${paginationNumber}`)
      .then((allProducts) => {
        dispatch(getProducts(allProducts.data))
      })
      .catch((err) => console.log(err));
  }; 




export default productsSlice.reducer;
