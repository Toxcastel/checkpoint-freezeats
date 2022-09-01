import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    allProducts: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload
    }
  }
});

export const { getAllProducts } = allProductsSlice.actions


export const handleAllProducts = () => (dispatch) => {
     axios
      .get('/api/products/all')
      .then((allProducts) => {
        dispatch(getAllProducts(allProducts.data))
      })
      .catch((err) => console.log(err));
  }; 



export default allProductsSlice.reducer;