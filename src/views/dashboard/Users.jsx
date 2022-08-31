import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { getAllUsers } from "../../store/reducers/adminUsersReducer";
import { useDispatch, useSelector } from "react-redux";
import { loadingHandler } from "../../store/reducers/loadingReducer";
import Loading from "../../commons/Loading";
import {
    Box,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    Switch,
    Typography,
} from "@mui/material";

// Generate Order Data
function preventDefault(event) {
    event.preventDefault();
}

const Users = () => {
    const users = useSelector((state) => state.adminUsers);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        console.log(event.target);
    };

    const getRole = (role) => {
        if (role === "admin") return true;
        else return false;
    };

    useEffect(() => {
        dispatch(getAllUsers()).then(() => console.log("usuarios traidos!"));
    }, []);

    useEffect(() => {
        if (users.length > 0) dispatch(loadingHandler(false));
    }, [users]);

    if (loading) {
        return <Loading />;
    } else {
        return (
            <React.Fragment>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: "flex" }}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Typography>Edit Users</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Link
                            color="primary"
                            href="#"
                            onClick={preventDefault}
                            sx={{ mt: 3 }}
                        >
                            <Typography>Add new user</Typography>
                        </Link>
                    </Grid>
                </Container>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => {
                            const auth = getRole(user.roles);
                            return (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={auth}
                                                    onChange={handleChange}
                                                    aria-label="login switch"
                                                />
                                            }
                                            // hacer que en el estado se guarde true o false
                                            label={auth ? "Admin" : "User"}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{`Otra cosa`}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
};

export default Users;
