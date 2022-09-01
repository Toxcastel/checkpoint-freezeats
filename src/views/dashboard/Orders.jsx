import * as React from "react";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button, Dialog } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useDispatch } from "react-redux";
import { getOrdersHistory } from "../../store/reducers/adminUsersReducer";

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders({ ordersId }) {
    const initialState = {
        products: [],
        totalPrice: undefined,
    };
    console.log("ordersId: ", ordersId);
    // estados
    const [open, setOpen] = useState(false);
    const [foodCount, setFoodCount] = useState({});
    const [displayOrders, setDisplayOrders] = useState(initialState);
    let conteo = {};
    let resumen = [];
    const dispatch = useDispatch();

    // handles
    const getFoodCount = (object) => {
        console.log("soy el object que llega al get: ", object);
        let prueba = [];
        for (const property in object) {
            prueba.push(<div>{`${property} x ${object[property]}`}</div>);
        }
        console.log("soy prueba: ", prueba);
        return prueba;
    };
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => {
        // primero abro
        setOpen(true);
        setDisplayOrders(initialState);
        // ejecuto la logica
        let products = [];
        dispatch(getOrdersHistory(ordersId)).then(({ payload }) => {
            payload.map(({ info }) =>
                products.push({ pedido: info[0].products, totalPrice: 15000 })
            );
            setDisplayOrders(products);
        });
    };
    return (
        <>
            <Button
                size="small"
                variant="text"
                color="info"
                onClick={handleClickOpen}
            >
                <ReceiptIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Title>Recent Orders</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Info</TableCell>
                            <TableCell>Sale Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayOrders.length ? (
                            displayOrders.map((order, i) => (
                                <TableRow key={i}>
                                    {console.log(
                                        "display order: ",
                                        displayOrders
                                    )}
                                    <TableCell key={i}>
                                        {order.pedido.forEach((sub, i) => {
                                            conteo[sub.name] =
                                                (conteo[sub.name] || 0) + 1;
                                            if (i === order.pedido.length - 1) {
                                                resumen.push(conteo);
                                                conteo = {};
                                            }
                                        })}

                                        {console.log("resumen: ", resumen)}
                                        {resumen.length ? (
                                            <>{getFoodCount(resumen[i])}</>
                                        ) : (
                                            <></>
                                        )}
                                    </TableCell>
                                    <TableCell>{order.totalPrice}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell> - </TableCell>
                                <TableCell> - </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Link
                    color="primary"
                    href="#"
                    onClick={preventDefault}
                    sx={{ mt: 3 }}
                >
                    See more orders
                </Link>
            </Dialog>
        </>
    );
}
