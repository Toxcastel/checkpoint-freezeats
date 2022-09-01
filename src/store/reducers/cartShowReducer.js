import { createSlice } from "@reduxjs/toolkit";


export const cartShowSlice = createSlice({
  name: "cartShow",
  initialState: {
    right: false,
  },
  reducers: {
    setShowCart: (state, action) => {
      state.right = action.payload
    }
  }
});

export const {setShowCart} = cartShowSlice.actions;

export default cartShowSlice.reducer

export const toggleCart = (open) => (dispatch,event) => {

if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  dispatch(setShowCart(open));
}