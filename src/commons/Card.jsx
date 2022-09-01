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
import Pagination from "./Pagination";
import { handleProductDetail } from "../store/reducers/productsReducer";
import ProductDetail from "./ProductDetail";

const comida =
  "https://i.pinimg.com/originals/75/1b/5c/751b5c7db42cb7b4a55706438c779fc4.jpg";

const Cards = () => {
  const { products, productDetail } = useSelector((state) => state.products);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

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
          display: "grid",
          columnGap: 1,
          rowGap: 1,
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        {products?.map((product) => (
          <Card
            sx={{ maxWidth: 345 }}
            key={product.id}
            onClick={() => handleClick(product)}
          >
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
