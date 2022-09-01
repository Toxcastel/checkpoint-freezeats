import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

// en el dashboard esta acción actualiza el estado de manera automática, por lo que no es necesario aplicarlos en el reducer.
export const adminGetAllProducts = createAsyncThunk("GET_PRODUCTS", async () => {
    const { data } = await axios.get("/api/products/");
    return data
});

// crear el thunk para modificar usuario.
export const adminEditProducts = createAsyncThunk("CHANGE_ROLE", async (obj) => {
    const { userId, roleName } = obj;
    const axiosUser = await axios.put(`/api/admin/users/${userId}`, {
        roleName,
    });
});

export const adminDeleteProduct = createAsyncThunk(
    "DELETE_USER",
    async (userId) => {
        const axiosUser = await axios.delete(`/api/admin/users/${userId}`);
    }
);



const adminProductsReducer = createReducer([], {
    [adminGetAllProducts.fulfilled]: (state, action) => action.payload,
});

export default adminProductsReducer;
