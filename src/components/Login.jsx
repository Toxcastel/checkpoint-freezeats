import React from "react";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logHandler } from "../store/reducers/userReducer";
import { message } from "antd";
import axios from "axios";
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { ThemeProvider } from "@mui/system";
import { getAdmin } from "../store/reducers/adminLog";

const Login = () => {
    // variables
    const email = useInput("email");
    const password = useInput("password");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = createTheme();

    // handles
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/user/login", {
                email: email.value,
                password: password.value,
            })
            .then(({ data }) => {
                dispatch(logHandler(data.user));
                message.success(`Welcome ${data.user.name}!`, 1);
                dispatch(getAdmin())
                navigate("/profile");
            })
            .catch(({ response }) => {
                const msg = Object.values(response.data.errors);
                msg.map((e) => e && message.error(e, 2));
            });
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required="true"
                                    type="email"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
