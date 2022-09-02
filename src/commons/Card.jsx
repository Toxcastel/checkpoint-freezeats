import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import Box from "@mui/material/Box";
import { handleProductDetail } from "../store/reducers/productsReducer";
import ProductDetail from "./ProductDetail";
import { message } from "antd";
import { textLength } from "../utils";
import { fetchCart } from "../store/reducers/cartReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { addtoFav } from "../store/reducers/productsReducer";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Cards = () => {
    const [products, search, productDetail] = useSelector((state) => [
        state.products.products,
        state.products.search,
        state.products.productDetail,
    ]);
    const user = useSelector((state) => state.user);
    const productsInCart = useSelector((state) => state.cart.products);
    const [expanded, setExpanded] = React.useState(false);

    let componente;
    search.length > 0 ? (componente = search) : (componente = products);

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (product) => {
        dispatch(handleProductDetail(product));
        handleClickOpen();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const isProductInCart = (productId) => {
        if (!productsInCart) return false;
        return !!productsInCart.find((p) => p.id === productId);
    };

    return (
        <>
            <Box
                sx={{
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    py: { xs: 2 },
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {componente.map((product) => {
                    const addProductToCart = (e) => {
                        e.preventDefault();
                        axios
                            .post("/api/car", {
                                products: product,
                            })
                            .then(() => {
                                dispatch(fetchCart());
                            })
                            .catch((err) => console.log(err));
                    };
                    return (
                        <Card
                            sx={{
                                width: 200,
                                mx: 2,
                                my: 3,
                                boxShadow: 10,
                                borderRadius: 5,
                            }}
                            key={product.id}
                        >
                            <CardMedia
                                onClick={() => handleClick(product)}
                                component="img"
                                height="194"
                                image={product.imgUrl}
                                alt="Nombre del plato"
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {expanded === false
                                        ? textLength(product.description)
                                        : ""}
                                    <Collapse
                                        in={expanded}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Typography>
                                            {product.description}
                                        </Typography>
                                    </Collapse>
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {user.id ? (
                                    <Box>
                                        <Checkbox
                                            onClick={() => {
                                                dispatch(addtoFav(product.id));
                                                message.success(
                                                    "Agregado a Favoritos"
                                                );
                                            }}
                                            icon={<FavoriteBorder />}
                                            checkedIcon={
                                                <Favorite
                                                    sx={{ color: "red" }}
                                                />
                                            }
                                        />
                                    </Box>
                                ) : (
                                    ""
                                )}
                                <IconButton
                                    aria-label="car"
                                    onClick={addProductToCart} disabled={isProductInCart(product.id)}
                                >
                                    <AddShoppingCartSharpIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    );
                })}
            </Box>

            {open && (
                <ProductDetail
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    productDetail={productDetail}
                    open={open}
                />
            )}
        </>
    );
};

export default Cards;
