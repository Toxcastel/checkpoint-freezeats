import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { removetoFav } from "../store/reducers/productsReducer";
import { message } from "antd";

const Fav = () => {
  const fav = useSelector((state)=> state.products.fav);
  const dispatch= useDispatch()
  return (
    <Box
      sx={{
        width: "auto",
        height: "auto",
        backgroundColor: "white",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        py: { xs: 2 },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fav.map((prod) => (
        <Card sx={{ width: 200, mx: 2, my: 3 }} key={prod.id}>
          <CardMedia
            component="img"
            height="194"
            image={prod.imgUrl}
            alt="Nombre del plato"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {prod.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {prod.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
            onClick={(e)=>{
              e.preventDefault()
              dispatch(removetoFav(prod.id))
              message.success("Eliminado")
            }}
            >Remove</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Fav;
