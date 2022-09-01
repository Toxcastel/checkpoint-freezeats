import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { message } from "antd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CssBaseline } from "@mui/material";
import { getAllUsers } from "../../store/reducers/adminUsersReducer";

export default function AddUser() {
    // variables formulario
    const name = useInput("name");
    const description = useInput("description");
    const price = useInput("price");
    const stock = useInput("stock");
    const category = useInput("category");
    const imgURL = useInput("imgURL");
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
            .post("/api/products/", {
                name: name.value,
                description: description.value,
                price: price.value,
                stock: stock.value,
                category: category.value,
                imgURL: imgURL.value,
            })
            .then(() => {
                message.success("Added succesfully!", 1);
                handleClose();
            })
            .catch((err) => {
                console.error(err)
            });
    };

    // useEffect para traer a los usuarios
    // useEffect(() => {
    //     dispatch(getAllUsers()).then(() => console.log("usuarios traidos!"));
    // }, [open]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Add new user</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Email"
                            type="email"
                            id="email"
                            fullWidth
                            variant="standard"
                            {...email}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Password"
                            type="password"
                            id="password"
                            fullWidth
                            variant="standard"
                            {...password}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Name"
                            type="text"
                            id="name"
                            fullWidth
                            variant="standard"
                            {...name}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Last name"
                            type="text"
                            id="lastname"
                            fullWidth
                            variant="standard"
                            {...lastname}
                        />
                        <FormControl
                            sx={{
                                width: 225,
                                backgroundColor: "white",
                                mx: { xs: 1 },
                                my: { xs: 1 },
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">
                                Role
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                value={category}
                                onChange={handleChange}
                                {...roles}
                            >
                                <MenuItem value={"user"}>User</MenuItem>
                                <MenuItem value={"admin"}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <CssBaseline />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Subscribe</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}