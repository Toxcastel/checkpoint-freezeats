import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    info:[],
    state:"Pending",
    total:null,
    user:null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.info = action.payload
      state.state = action.payload
      state.total = action.payload
      state.user = action.payload
    }
  }
});

export const {setOrder} = orderSlice.actions;

export default orderSlice.reducer

export const addNewOrder = (total) => (dispatch) => {
    axios
        .post("/api/orders", {
            total,
        })
        .then((order) => dispatch(setOrder(order.data)))
        .catch((err) => console.log(err));
}
