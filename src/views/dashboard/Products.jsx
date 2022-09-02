import { Container, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadingHandler } from "../../store/reducers/loadingReducer";
import {
    adminDeleteProduct,
    adminGetAllProducts,
} from "../../store/reducers/adminProductsReducer";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../../commons/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

const Products = () => {
    const products = useSelector((state) => state.adminProducts);
    console.log("products: ", products)
    const loading = useSelector((state) => state.loading);
    const [deleteAction, setDeleteAction] = useState(true);
    const dispatch = useDispatch();

    const deleteProduct = (prodId) => {
        dispatch(adminDeleteProduct(prodId)).then(() => {
            if (deleteAction) {
                setDeleteAction(false);
            } else {
                setDeleteAction(true);
            }
        });
    };

    useEffect(() => {
        dispatch(adminGetAllProducts()).then(() =>
            console.log("products aquí!")
        );
    }, []);

    useEffect(() => {
        if (products.length) dispatch(loadingHandler(false));
    }, []);

    if (loading) {
        return <Loading />;
    } else {
        return (
            <React.Fragment>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex" }}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Typography>Products manager</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <AddProduct />
                    </Grid>
                </Container>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => {
                            return (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.rating}</TableCell>
                                    <TableCell>
                                        <EditProduct {...product} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() =>
                                                deleteProduct(product.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
};

export default Products;
