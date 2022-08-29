import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import  Box  from "@mui/material/Box";

const comida =
  "https://i.pinimg.com/originals/75/1b/5c/751b5c7db42cb7b4a55706438c779fc4.jpg";

const Cards = () => {
    const { products } = useSelector((state) => state.products);
  return (
    <Box sx={{
        display: 'grid',
        columnGap: 1,
        rowGap: 1,
        gridTemplateColumns: 'repeat(5, 1fr)',
      }}>
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
               {product.description}
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
      </Box>
  )
}

export default Cards