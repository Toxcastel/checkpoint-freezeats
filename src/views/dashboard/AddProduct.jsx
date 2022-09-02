import { CssBaseline, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { adminGetAllProducts } from "../../store/reducers/adminProductsReducer";
import { useDispatch } from "react-redux";
import { useInput } from "../../hooks/useInput";
import { message, Typography } from "antd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddProduct(props) {
    // variables formulario
    const name = useInput("name");
    const description = useInput("description");
    const category = useInput("category");
    const price = useInput("price");
    const stock = useInput("stock");
    const imgUrl = useInput("imgUrl");
    const rating = useInput("rating");
    const dispatch = useDispatch();

    // estados
    const [open, setOpen] = useState(false);
    const [oCategory, setOCategory] = useState("");

    // handles
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = (event) => {
        setOCategory(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`/api/products/`, {
                name: name.value,
                description: description.value,
                price: price.value,
                stock: stock.value,
                category: category.value,
                imgUrl: imgUrl.value,
                rating: rating.value,
            })
            .then(() => {
                message.success("Product created!", 1);
                handleClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // useEffect para traer a los productos
    useEffect(() => {
        dispatch(adminGetAllProducts());
    }, [open]);

    return (
        <div>
            <Box sx={{ flexDirection: 'row' }}>
                <IconButton variant="outlined" onClick={handleClickOpen}>
                    <AddCircleIcon />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Añadir nuevo producto</DialogTitle>
                    <DialogContent>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="text"
                            id="name"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">Nombre</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                {...name}
                            />
                        </FormControl>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="text"
                            id="description"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">
                                Descripción
                            </InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                {...description}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: 225,
                                backgroundColor: "white",
                                mx: { xs: 1 },
                                my: { xs: 1 },
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">
                                Categoría
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                value={oCategory}
                                onChange={handleChange}
                                {...category}
                            >
                                <MenuItem value={"argentina"}>
                                    Argentina
                                </MenuItem>
                                <MenuItem value={"chilena"}>Chilena</MenuItem>
                                <MenuItem value={"colombiana"}>
                                    Colombiana
                                </MenuItem>
                                <MenuItem value={"venezolana"}>
                                    Venezolana
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="number"
                            id="price"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">Precio</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                {...price}
                            />
                        </FormControl>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="number"
                            id="stock"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">Stock</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                {...stock}
                            />
                        </FormControl>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="number"
                            id="rating"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">Rating</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                {...rating}
                            />
                        </FormControl>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="text"
                            id="rating"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">
                                Image URL
                            </InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                {...imgUrl}
                            />
                        </FormControl>
                    </DialogContent>
                    <CssBaseline />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">Aceptar</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
