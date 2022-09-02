import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const adminGetAllProducts = createAsyncThunk("GET_PRODUCTS", async () => {
    const { data } = await axios.get("/api/products/all");
    return data
});

export const adminDeleteProduct = createAsyncThunk(
    "DELETE_PRODUCT",
    async (prodId) => {
        const axiosProd = await axios.delete(`/api/products/${prodId}`);
    }
);

const adminProductsReducer = createReducer([], {
    [adminGetAllProducts.fulfilled]: (state, action) => action.payload,
});

export default adminProductsReducer;
