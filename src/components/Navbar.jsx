import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import LunchDiningSharpIcon from "@mui/icons-material/LunchDiningSharp";
import { Link } from "react-router-dom";
import SearchBar from "../commons/SearchBar";
import CartIcon from "../commons/CartIcon";
import { backHome } from "../store/reducers/productsReducer";
import { toggleCart } from "../store/reducers/cartShowReducer";
import axios from "axios";
import { logHandler, logOut } from "../store/reducers/userReducer";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        axios.post("/api/user/logout").then(() => dispatch(logOut()));
    };

    const home = () => {
        dispatch(backHome());
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "#00897b" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link style={{color:'white'}} to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <Link to="/" onClick={home}>
                                <div style={{color:'white'}}>Freezeats</div>
                            </Link>
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Productos
                                </Typography>
                                <Typography textAlign="center">
                                    Categorias
                                </Typography>
                                <Typography textAlign="center">
                                    Carrito
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <LunchDiningSharpIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "red",
                            textDecoration: "none",
                        }}
                    ></Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button>
                            <Link to="/products"> Favorites</Link>
                        </Button>
                    </Box>
                    <SearchBar />
                    {user.id ? (
                        <Box
                            sx={{
                                flexGrow: 0,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="Remy Sharp" src="" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <Link to="/profile">Profile</Link>
                                </MenuItem>
                                <MenuItem>
                                    <Typography onClick={() => handleLogOut()}>
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                            <Button onClick={() => dispatch(toggleCart(true))}>
                                <CartIcon />
                            </Button>
                            {admin ? (
                                <IconButton
                                    sx={{
                                        backgroundColor: "#80cbc4",
                                        "&:hover": {
                                            backgroundColor: "#00796b",
                                        },
                                    }}
                                    onClick={() => navigate("/dashboard")}
                                >
                                    <AdminPanelSettingsIcon  />
                                </IconButton>
                            ) : (
                                <></>
                            )}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button>
                                <Link to="/signup">SignUp</Link>
                            </Button>
                            <Button>
                                <Link
                                    to="/login"
                                    style={{ textDecoration: "none" }}
                                >
                                    Login
                                </Link>
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
