import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk("GET_USERS", async () => {
    const { data } = await axios.get("/api/admin/users");
    const roles = await axios.get("/api/admin/roles");
    const rolArray = roles.data;
    const users = data.map((user) => {
        if (user.roles.length) {
            const rol = rolArray.find((rol) => rol._id === user.roles[0]);
            console.log("soy rol: ", rol);
            user.roles = rol.name;
            return user;
        } else {
            user.roles = "usuario";
            return user;
        }
    });
    console.log("que coño soy? ", users);
    return users;
});

const adminUsersReducer = createReducer([], {
    [getAllUsers.fulfilled]: (state, action) => action.payload,
});

export default adminUsersReducer;
