import { CssBaseline, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminGetAllProducts } from "../../store/reducers/adminProductsReducer";
import { message } from "antd";
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
import EditIcon from "@mui/icons-material/Edit";

export default function EditProduct(props) {
    // variables formulario
    const { category, description, id, imgUrl, name, price, stock, rating } =
        props;
    useState();
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    const [newStock, setNewStock] = useState(stock);
    const [newCategory, setNewCategory] = useState(category);
    const [newImgUrl, setNewImgUrl] = useState(imgUrl);
    const [newRating, setNewRating] = useState(rating);
    const dispatch = useDispatch();

    // estados
    const [open, setOpen] = useState(false);

    // handles
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = (event) => {
        setNewCategory(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`/api/products/${id}`, {
                name: newName,
                description: newDescription,
                price: newPrice,
                stock: newStock,
                category: newCategory,
                imgURL: newImgUrl,
                rating: newRating,
            })
            .then(() => {
                message.success("Product changed!", 1);
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
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogContent>
                        <FormControl
                            autoFocus
                            margin="dense"
                            type="text"
                            id="name"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="my-input">Name</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                defaultValue={name}
                                onChange={(e) => {
                                    setNewName(e.target.value);
                                }}
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
                                Description
                            </InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                defaultValue={description}
                                onChange={(e) =>
                                    setNewDescription(e.target.value)
                                }
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
                                Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                defaultValue={category}
                                onChange={(e) => handleChange(e)}
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
                            <InputLabel htmlFor="my-input">Price</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                defaultValue={price}
                                onChange={(e) => setNewPrice(e.target.value)}
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
                                defaultValue={stock}
                                onChange={(e) => setNewStock(e.target.value)}
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
                                defaultValue={rating}
                                onChange={(e) => setNewRating(e.target.value)}
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
                                defaultValue={imgUrl}
                                onChange={(e) => setNewImgUrl(e.target.value)}
                            />
                        </FormControl>
                    </DialogContent>
                    <CssBaseline />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Confirm</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
