import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products:[],
    address:"",
    user:"",
  },
  reducers: {
    setCart: (state, action) => {
      state.products = action.payload.products
      state.address = action.payload.address
      state.user = action.payload.user
      state.id = action.payload.id
    }
  }
});

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer

export const fetchCart = () => (dispatch) => {
    axios
     .get("/api/car")
     .then((data) => {
      console.log("data",data)
       dispatch(setCart(data.data))
     })
     .catch((err) => console.log(err));
  }; 







