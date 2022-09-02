import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CssBaseline, IconButton } from "@mui/material";
import { getAllUsers } from "../../store/reducers/adminUsersReducer";
import { useInput } from "../../hooks/useInput";
import { message } from "antd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <AddCircleIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Añadir nuevo usuario</DialogTitle>
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
                            label="Contraseña"
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
                            label="Nombre"
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
                            label="Apellido"
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
                                Rol
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                value={category}
                                onChange={handleChange}
                                {...roles}
                            >
                                <MenuItem value={"user"}>Usuario</MenuItem>
                                <MenuItem value={"admin"}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <CssBaseline />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Aceptar</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
