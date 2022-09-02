import React from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  Typography,
  Slide,
  CardActions,
  IconButton,
  CardMedia,
  Box,
  Grid,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { message } from "antd";

const ProductDetail = (props) => {
  const { open, handleClose, productDetail } = props;

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const Item = styled("div")(({ theme }) => ({
    textAlign: "center",
  }));



  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth="sm"
        fullWidth="fullWidth"
        TransitionComponent={Transition}
      >
        <DialogTitle className="App" sx={{ bgcolor: "#00897b" }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: "white", fontFamily: "sans-serif" }}
          >
            {productDetail.name}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Box sx={{ display: "inline-block", width: "50%" }}>
              <CardMedia
                component="img"
                image={productDetail.imgUrl}
                alt="Nombre del plato"
              />
            </Box>
            <Grid lg={6}>
              <Item>
                <Typography variant="subtitle1" alignContent="center">
                  Descripcion del producto
                </Typography>
              </Item>
              <Typography variant="caption">
                {productDetail.description}
              </Typography>
              <br />
              <Typography variant="h4" color="#0496FF">
                ${productDetail.price}
              </Typography>
              <Grid container>
                <Box sx={{ display: "inline-block", width: "26%" }}>
                  <Item>
                    <Typography variant="subtitle2">
                      <InventoryOutlinedIcon /> Stock
                    </Typography>

                    <Typography variant="h6">{productDetail.stock}</Typography>
                  </Item>
                </Box>
                <Box sx={{ display: "inline-block", width: "35%" }}>
                  <Item>
                    <Typography variant="subtitle2">
                      <StarBorderOutlinedIcon /> Calificación
                    </Typography>
                    <Typography variant="h6">{productDetail.rating}</Typography>
                  </Item>
                </Box>
                <Box sx={{ display: "inline-block", width: "39%" }}>
                  <Item>
                    <Typography variant="subtitle2">
                      <CategoryOutlinedIcon /> Categoria
                    </Typography>
                    <Typography variant="h6">
                      {productDetail.category}
                    </Typography>
                  </Item>
                </Box>
              </Grid>
              <CardActions disableSpacing>
                <Grid container>
                  <Box sx={{ display: "inline-block", width: "50%" }}>
                    <Item>
                      <IconButton
                        aria-label="add to favorites"
                        sx={{
                          "&:hover": { color: "white", bgcolor: "#d32f2f" },
                          color: "red",
                          boxShadow: 1,
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Item>
                  </Box>

                  <Box sx={{ display: "inline-block", width: "50%" }}>
                    <IconButton
                      aria-label="car"
                      sx={{
                        "&:hover": { bgcolor: "#0496FF", color: "white" },
                        borderRadius: 6,
                        boxShadow: 1,
                        width: "8rem",
                        height: "2.60rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        borderColor: "#0496FF",
                      }}
                    >
                      <AddShoppingCartSharpIcon />
                      AGREGAR
                    </IconButton>
                  </Box>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
