import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

// en el dashboard esta acción actualiza el estado de manera automática, por lo que no es necesario aplicarlos en el reducer.
export const getAllUsers = createAsyncThunk("GET_USERS", async () => {
    const { data } = await axios.get("/api/admin/users");
    const roles = await axios.get("/api/admin/roles");
    const rolArray = roles.data;
    const users = data.map((user) => {
        if (user.roles.length) {
            const rol = rolArray.find((rol) => rol._id === user.roles[0]);
            user.roles = rol.name;
            return user;
        } else {
            user.roles = "user";
            return user;
        }
    });
    return users;
});

// crear el thunk para modificar usuario.
export const changeUserRole = createAsyncThunk("CHANGE_ROLE", async (obj) => {
    const { userId, roleName } = obj;
    const axiosUser = await axios.put(`/api/admin/users/${userId}`, {
        roleName,
    });
    console.log("el resultado: ", axiosUser);
});

export const adminDeleteUser = createAsyncThunk(
    "DELETE_USER",
    async (userId) => {
        const axiosUser = await axios.delete(`/api/admin/users/${userId}`);
        console.log("usuario eliminado: ", axiosUser);
    }
);

export const getOrdersHistory = createAsyncThunk(
    "ORDERS_HISTORY",
    async (id) => {
        const { data } = await axios.get("/api/order", { headers: { id } });
        return data;
    }
);

const adminUsersReducer = createReducer([], {
    [getAllUsers.fulfilled]: (state, action) => action.payload,
});

export default adminUsersReducer;
