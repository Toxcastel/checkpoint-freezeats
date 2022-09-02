import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import Loading from "../commons/Loading";
import { loadingHandler } from "../store/reducers/loadingReducer";
import { message } from "antd";
import { Grid, TextField, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [textValue, setTextValue] = useState({
    firstName: "",
    lastName: "",
    email:user.email,
    password: "",
    address1: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onTextChange = (e) =>
    setTextValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = () => {
    textValue.firstName = !textValue.firstName
      ? user.name
      : textValue.firstName;
    textValue.lastName = !textValue.lastName
      ? user.lastname
      : textValue.lastName;
    textValue.password = !textValue.password
      ? user.password
      : textValue.password;
    textValue.address1 = !textValue.address1
      ? user.addresses[0]
      : textValue.address1;
    console.log(textValue);
  };

  // intento de protección de ruta. La idea es capturar la validación desde la api, sin tomar en cuenta el reducer.
  useEffect(() => {
    axios
      .get("/api/user/profile")
      .then((user) => {
        dispatch(loadingHandler(false));
        message.success("Welcome back!", 1);
      })
      .catch((err) => {
        message.error("Nothing to do here!", 1);
        navigate("/");
      });
  }, [dispatch, navigate]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <React.Fragment>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Typography component="h1" variant="h5">
            Bienvenido {user.name}
          </Typography>

          <Grid item xs={12} sm={6} width="30em">
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={onTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="30em">
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Apellido"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={onTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="30em">
            <TextField
              required
              id="email"
              name="email"
              label={user.email}
              fullWidth
              autoComplete="email"
              variant="standard"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} width="30em">
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              onChange={onTextChange}
              autoComplete="current-password"
              variant="standard"
              type="password"
            />
          </Grid>
          <Grid item xs={12} width="30em">
            <TextField
              required
              id="address1"
              name="address1"
              label="Dirección principal"
              onChange={onTextChange}
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                e.preventDefault()
                handleSubmit();
                axios
                  .put("/api/user/profile", {
                    name: textValue.name,
                    lastname: textValue.lastname,
                    email: textValue.email,
                    password: textValue.password,
                  })
                  .then((updateUser) => {
                    if (!updateUser.data.ok) {
                      setError(true);
                      setErrorMessage(updateUser.data.errorMessage);
                      return;
                    }
                    message.success("Cambios realizados");
                  });
              }}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default Profile;
