import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    info:[],
    state:"",
    total:null,
    user:null,
    address: {street: "", number: null, city: "", province: "", postalCode: null},
    id:null,
    paymentMethod:"",
    shipping:"",
  },
  reducers: {
    setOrder: (state, action) => {
      state.info = action.payload.info
      state.state = action.payload.state
      state.total = action.payload.total
      state.user = action.payload.user
      state.address = action.payload.address
      state.id = action.payload.id
      state.paymentMethod = action.payload.paymentMethod
      state.shipping = action.payload.shipping
    }
  }
});

export const {setOrder} = orderSlice.actions;


export const fetchOrder = () => (dispatch) => {
    axios
      .get("/api/order")
      .then((data) => {
        dispatch(setOrder(data.data))
      })
      .catch((err) => console.log(err));
  };


export const addNewOrder = (total) => (dispatch) => {
    axios
        .post("/api/order", {
            total,
        })
        .then((order) => {
            dispatch(setOrder(order.data))
        })
        .catch((err) => console.log(err));
}

export default orderSlice.reducer