import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CssBaseline } from "@mui/material";
import { getAllUsers } from "../../store/reducers/adminUsersReducer";
import { useInput } from "../../hooks/useInput";
import { message } from "antd";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddUser() {
    // variables formulario
    const email = useInput("email");
    const password = useInput("password");
    const name = useInput("name");
    const lastname = useInput("lastname");
    const roles = useInput("roles");
    const dispatch = useDispatch();

    // estados
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");

    // handles
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/user/signup", {
                email: email.value,
                password: password.value,
                name: name.value,
                lastname: lastname.value,
                roles: roles.value,
            })
            .then(() => {
                message.success("Signed in succesfully!", 2);
                handleClose();
            })
            .catch(({ response }) => {
                const msg = Object.values(response.data.errors);
                msg.map((e) => e && message.error(e, 2));
            });
    };

    // useEffect para traer a los usuarios
    useEffect(() => {
        dispatch(getAllUsers());
    }, [open]);

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
