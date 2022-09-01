import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetail:{}
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload
    },
    getProductDetail:(state, action)=>{
      state.productDetail = action.payload
    }
  }
});

export const { getProducts, getProductDetail} = productsSlice.actions

export const handleProducts = (paginationNumber) => (dispatch) => {
     axios
      .get(`/api/products?pages=${paginationNumber}`)
      .then((allProducts) => {
        dispatch(getProducts(allProducts.data))
      })
      .catch((err) => console.log(err));
  }; 

export const handleProductDetail = (product) =>(dispatch) =>{
 console.log(">>>>>", product,dispatch)
 dispatch(getProductDetail(product))
}



export default productsSlice.reducer;
