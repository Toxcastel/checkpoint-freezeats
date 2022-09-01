import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;

export const fetchCategory = (categoria) => (dispatch) => {
  console.log('categoria',categoria);
  axios.get(`/api/products/category/${categoria}`).then((response) => {
    console.log('aca',response);
    dispatch(setCategory(response.data))
  })
  .catch((error) => console.log(error))
};
