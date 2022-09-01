import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    adminDeleteUser,
    changeUserRole,
    getAllUsers,
} from "../../store/reducers/adminUsersReducer";
import { useDispatch, useSelector } from "react-redux";
import { loadingHandler } from "../../store/reducers/loadingReducer";
import Loading from "../../commons/Loading";
import {
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "./AddUser";
import Orders from "./Orders";
import { adminGetAllProducts } from "../../store/reducers/adminProductsReducer";
import EditIcon from '@mui/icons-material/Edit';

const Products = () => {
    const products = useSelector((state) => state.adminProducts);
    const loading = useSelector((state) => state.loading);
    const [changeIcon, setChangeIcon] = useState(true);
    const [deleteAction, setDeleteAction] = useState(true);
    const dispatch = useDispatch();

    const handleChange = (obj) => {
        dispatch(changeUserRole(obj)).then(() => {
            if (changeIcon) {
                setChangeIcon(false);
            } else {
                setChangeIcon(true);
            }
        });
    };

    const deleteUser = (userId) => {
        dispatch(adminDeleteUser(userId)).then(() => {
            if (deleteAction) {
                setDeleteAction(false);
            } else {
                setDeleteAction(true);
            }
        });
    };

    const getRole = (role) => {
        if (role === "admin") return true;
        else return false;
    };

    useEffect(() => {
        dispatch(adminGetAllProducts()).then(() => console.log("products aquí!"));
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
                        <AddUser />
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
                                        <EditIcon />
                                    </TableCell>
                                    <TableCell align="right">
                                            <DeleteIcon />
                                        {/* <IconButton
                                            onClick={() => deleteUser(product.id)}
                                        >
                                        </IconButton> */}
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
