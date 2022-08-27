import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProducts } from "../store/reducers/productsReducer";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";

//"Holii"

const comida =
  "https://i.pinimg.com/originals/75/1b/5c/751b5c7db42cb7b4a55706438c779fc4.jpg";

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleProducts());
  }, [dispatch]);

  return (
    <>
      {products.map((product) => (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
          <CardMedia
            component="img"
            height="194"
            image={comida}
            alt="Nombre del plato"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aqui va la descripcion
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="car">
              <AddShoppingCartSharpIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default Home;
