import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        address: "",
        user: "",
    },
    reducers: {
        setCart: (state, action) => {
            state.products = action.payload.products;
            state.address = action.payload.address;
            state.user = action.payload.user;
            state.id = action.payload.id;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setCart, setProducts } = cartSlice.actions;

export const fetchCart = () => (dispatch) => {
    axios
        .get("/api/car")
        .then((data) => {
            dispatch(setCart(data.data));
        })
        .catch((err) => console.log(err));
};

export default cartSlice.reducer;
