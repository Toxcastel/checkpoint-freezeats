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
import Box from "@mui/material/Box";
import { fetchCategory } from "../store/reducers/categoryReducer";
import { useParams } from "react-router-dom";

const CategoryContainer = () => {
  const { category: cate } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoria = category.toLowerCase().split(" ")[0];
  useEffect(() => {
    dispatch(fetchCategory(categoria));
  }, [categoria,dispatch]);

  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 1,
        rowGap: 1,
        gridTemplateColumns: "repeat(5, 1fr)",
      }}
    >
      {cate.map((product) => (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
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
              {product.price}
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
  );
};

export default CategoryContainer;
