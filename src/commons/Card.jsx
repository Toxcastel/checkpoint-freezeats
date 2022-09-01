import axios from "axios";
import { useSelector } from "react-redux";
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
import { message } from "antd";
import { textLength } from "../utils";


const Cards = () => {
  const [products, search] = useSelector((state) => [
    state.products.products,
    state.products.search,
  ]);
 const user = useSelector((state) => state.user)

  let componente;
  search.length > 0 ? (componente = search) : (componente = products);
  return (
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
        const addFavorite = (e) => {
          e.preventDefault();
          axios
            .post(`/api/fav`, {
              id: product.id,
            })
            .then(() => message.success("Agregado a Favoritos"));
        };
        return (
          <Card sx={{ width: 200, mx: 2, my: 3 }} key={product.id}>
            <CardMedia
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
                {textLength(product.description)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {user.id? <IconButton aria-label="add to favorites" onClick={addFavorite}>
                <FavoriteIcon />
              </IconButton> : ""}
              <IconButton aria-label="car">
                <AddShoppingCartSharpIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default Cards;
