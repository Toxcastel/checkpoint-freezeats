import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { message } from "antd";

export default function AddUser() {
    const [open, setOpen] = React.useState(false);
    const email = useInput("email");
    const password = useInput("password");
    const name = useInput("name");
    const lastname = useInput("lastname");
    const roles = useInput("roles");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [category, setCategory] = React.useState("");

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
            .then((res) => {
                message.success("Signed in succesfully!", 2);
            })
            .catch(({ response }) => {
                const msg = Object.values(response.data.errors);
                msg.map((e) => e && message.error(e, 2));
            });
    };

    return (
        <div>
            <Button onClick={handleOpen}>Add User</Button>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    backgroundColor: "white",
                    border: "1px solid black",
                    boxShadow: 2,
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        sx={{
                            my: 0,
                        }}
                    >
                        Add Products
                    </Typography>
                    <Button onClick={handleClose}>X</Button>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#e0f2f1",
                            p: 2,
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: "center",
                                justifyContent: "space-around",
                                py: 4,
                            }}
                        >
                            <TextField
                                label="Name"
                                type="text"
                                id="outlined-size-small"
                                defaultValue=""
                                size="medium"
                                sx={{
                                    backgroundColor: "white",
                                    width: 225,
                                    my: { xs: 1 },
                                }}
                                {...name}
                            />
                            <TextField
                                label="Last Name"
                                type="text"
                                id="outlined-size-small"
                                defaultValue=""
                                size="medium"
                                multiline
                                maxRows={4}
                                sx={{
                                    backgroundColor: "white",
                                    width: 225,
                                    my: { xs: 1 },
                                    mx: { xs: 1 },
                                }}
                                {...lastname}
                            />
                            <TextField
                                label="Email"
                                id="outlined-size-small"
                                type="email"
                                size="medium"
                                multiline
                                maxRows={4}
                                sx={{
                                    backgroundColor: "white",
                                    width: 225,
                                    my: { xs: 1 },
                                    mx: { xs: 1 },
                                }}
                                {...email}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-around",
                                pb: 4,
                            }}
                        >
                            <TextField
                                id="outlined-number"
                                label="Password"
                                type="password"
                                {...password}
                                sx={{
                                    backgroundColor: "white",
                                    width: 225,
                                    my: { xs: 1 },
                                }}
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
                        </Box>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#004d40",
                                    ":focus": {
                                        outline: "none",
                                    },
                                    ":hover": {
                                        backgroundColor: "#009688",
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </>
            </Modal>
        </div>
    );
}
