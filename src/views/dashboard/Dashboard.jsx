import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits.jsx";
import Orders from "./Orders";
import Users from "./Users";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        backgroundColor: "#e0f2f1",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme({});

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const [views, setViews] = React.useState("all");

    // if(views === "orders" || views==="all")
    // if(views === "products" || views==="all")
    // if(views === "users" || views==="all" )

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = (select) => {
        setViews(select);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#e0f2f1",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List sx={{ backgroundColor: "#e0f2f1" }} component="nav">
                        <React.Fragment>
                            <ListItemButton onClick={() => setViews("all")}>
                                <ListItemIcon>
                                    <DashboardIcon sx={{ color: "#00897b" }} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                            <ListItemButton onClick={() => setViews("orders")}>
                                <ListItemIcon>
                                    <ShoppingCartIcon
                                        sx={{ color: "#00897b" }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Orders" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => setViews("products")}
                            >
                                <ListItemIcon>
                                    <BarChartIcon sx={{ color: "#00897b" }} />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItemButton>
                            <ListItemButton onClick={() => setViews("users")}>
                                <ListItemIcon>
                                    <PeopleIcon sx={{ color: "#00897b" }} />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </React.Fragment>
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Ordenes */}
                            {views === "orders" || views === "all" ? (
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 240,
                                        }}
                                    >
                                        <Chart />
                                    </Paper>
                                </Grid>
                            ) : (
                                <></>
                            )}

                            {/* Productos */}
                            {views === "products" || views === "all" ? (
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 240,
                                        }}
                                    >
                                        <Deposits />
                                    </Paper>
                                </Grid>
                            ) : (
                                <></>
                            )}

                            {/* Usuarios*/}
                            {views === "users" || views === "all" ? (
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Users />
                                    </Paper>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
