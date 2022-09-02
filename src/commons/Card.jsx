import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import Box from "@mui/material/Box";
import Pagination from "./Pagination";
import {
  addtoFav,
  handleProductDetail,
} from "../store/reducers/productsReducer";
import ProductDetail from "./ProductDetail";
import { message } from "antd";
import { textLength } from "../utils";
import { fetchCart } from "../store/reducers/cartReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { addFav } from "../store/reducers/productsReducer";

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

  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: "auto",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          py: { xs: 2 },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {componente.map((product) => {
          /*  const addFavorite = (e) => {
            e.preventDefault();
            axios
              .post(`/api/fav`, {
                id: product.id,
              })
              .then(() => message.success("Agregado a Favoritos"));
          } */ const addProductToCart = (e) => {
            e.preventDefault();
            axios
              .post("/api/car", {
                products: product,
                address: "Calle siempre-viva",
              })
              .then(() => {
                dispatch(fetchCart());
              })

              .catch((err) => console.log(err));
          };
          return (
            <Card sx={{ width: 200, mx: 2, my: 3 }} key={product.id}>
              <CardMedia
                onClick={() => handleClick(product)}
                component="img"
                height="194"
                image={product.imgUrl}
                alt="Nombre del plato"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expanded == false ? textLength(product.description) : ""}
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography>{product.description}</Typography>
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
                        message.success("Agregado a Favoritos");
                      }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                  </Box>
                ) : (
                  ""
                )}
                <IconButton aria-label="car" onClick={addProductToCart}>
                  <AddShoppingCartSharpIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Pagination />
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
