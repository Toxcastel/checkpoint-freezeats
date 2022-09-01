import axios from "axios";
import { getCart, setCart } from "../store/reducers/cartReducer";
import { Alert, Avatar, Box, Divider, Paper, Snackbar, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/reducers/cartReducer";
import { toggleCart } from "../store/reducers/cartShowReducer";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";


const Car = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {products} = useSelector((state) => state.cart);
  console.log("products", products);
 
  console.log("cart", cart);

const [cartInfo, setCartInfo] = useState([products]);
  const { right } = useSelector((state) => state.cartShow);


  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = (event, reason) => {
    setError(false);
  };

  useEffect(() => {
    setCartInfo(products);
  }, [cart]);
  

const total = cartInfo.reduce((acc, product) => {
  return acc + product.price * product.quantity;
}, 0);

  return (
    <Drawer
      open={right}
      onClose={() => dispatch(toggleCart(false))}
      anchor="right"
      PaperProps={{
        sx: {
          width: { xs: 400, sm: 500 },
          background: "#e0f2f1",
          borderRadius: 0,
        },
      }}
    >
      <Button
        variant="text"
        sx={{
          color: "black",
          width: 0,
          anchor: "right",
          p: 0.8,
          position: "absolute",
          right: "1%",
          ":focus": {
            outline: "none",
          },
        }}
        onClick={() => dispatch(toggleCart(false))}
      >
        Cerrar
      </Button>
      
        <Typography variant="h3" color="black" sx={{textAlign:"center", mt:8, mb:4}}>
          Your Cart
        </Typography>

      {cartInfo && cartInfo.length ? (
       cartInfo.map((item, i) => (


            <Box key={i}>
            <Box
              display="flex"
              sx={{ pt: 2, pb: 2, pl: 1.5 }}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Box display="flex" alignItems={"center"} width="55%">
                <Tooltip title="Delete">
                  <IconButton
                    sx={{
                      ":focus": {
                        outline: "none",
                      },
                    }}
                    onClick={(e)=>{
                      e.preventDefault();
                        axios
                        .delete("/api/car", { headers:{
                          productid: item.id, 
                          cartId: cart.id
                        }
                        })
                        .then(() => {
                          const newArray =  cartInfo.filter((deleted)=>deleted.id!==item.id)
                          setCartInfo(newArray)
              
                          products(newArray)
                          
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    <DeleteIcon sx={{ color: "#004d40" }} />
                  </IconButton>
                </Tooltip>
                <Avatar
                  src={item.imgUrl}
                  sx={{ width: 80, height: 80, mr: 2 }}
                ></Avatar>
                <Box display="flex" flexDirection={"column"}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="subtitle2">
                    {item.description}
                  </Typography>
                  <Typography variant="subtitle3" color="#004d40">
                    Stock: {item.stock}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyItems={"center"}
                justifyContent={"center"}
              >
                <IconButton
                  sx={{
                    ":focus": {
                      outline: "none",
                    },
                  }}
                >
                  <RemoveIcon
                    sx={{
                      borderRadius: 50,
                      color: "white",
                      backgroundColor: "#004d40",
                    }}
                    onClick={(e)=>{
                      axios.put("/api/car", {
                        productid: item.id,
                        cartId:cart.id,
                        quantity:item.quantity-1
                      }).then((updateCart)=>{
                        
                        if (!updateCart.data.ok) {
                          setError(true);
                          setErrorMessage(updateCart.data.errorMessage)
                          return;
                        }
                        dispatch(setCart(updateCart.data.cart));
                        products(updateCart.data.cart.products)})
                    }}
                      
                  />
                </IconButton>

                <Typography
                  variant="body1"
                  justifyContent={"end"}
                  sx={{ mt: 0.8 }}
                >
                  {item.quantity}
                </Typography>
                <IconButton
                  sx={{
                    ":focus": {
                      outline: "none",
                    },
                  }}
                >
                  <AddIcon
                    sx={{
                      borderRadius: 50,
                      color: "white",
                      backgroundColor: "#004d40",
                      borderColor: "#004d40",
                    }}
                    onClick={(e)=>{
                      axios.put("/api/car", {
                        productid: item.id,
                        cartId:cart.id,
                        quantity:item.quantity+1
                      }).then((updateCart)=>{
                        if (!updateCart.data.ok) {
                          setError(true);
                          setErrorMessage(updateCart.data.errorMessage)
                          return;
                        }
                        dispatch(setCart(updateCart.data.cart));
                        products(updateCart.data.cart.products)})
                    }}
                      
                  />
                </IconButton>
              </Box>
              <Box
                display="flex"
                width={"15%"}
                justifyContent={"flex-end"}
                sx={{ mr: 1 }}
              >
                <Typography
                  variant="body1"
                  justifyContent={"end"}
                  sx={{ mt: 0.8 }}
                >
                  ${item.price}
                </Typography>
              </Box>
            </Box>
            <Divider variant="inset" />
          </Box>
        )) 
      ) : (
        <Box
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          alignItems="center"
          sx={{ my: 10 }}
        >
          <Avatar
            variant="square"
            src="https://cdn-icons-png.flaticon.com/512/6149/6149396.png"
            sx={{ width: 300, height: 300, mr: 2 }}
          ></Avatar>
          <Typography variant="h4" justifyContent={"end"} sx={{ mt: 0.8 }}>
            Empty Cart
          </Typography>
        </Box>
      )
      }
      
    {cartInfo && cartInfo.length ? (
      <Box display="flex" justifyContent={"flex-end"} sx={{ mt: 2, pr: 1 }}>
        <Typography variant="h6" color="black" sx={{ mr: 2 }}>
          Total:
        </Typography>
        <Typography variant="h6" color="black">
          ${total}
        </Typography>
      </Box>
    ) : (
      null
    )}

      {cartInfo && cartInfo.length ? (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Link to="/order">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#004d40",
                ":focus": {
                  outline: "none",
                },
                ":hover": {
                  backgroundColor: "#009688",
                },
              }}
            >
              Continuar compra
            </Button>
          </Link>
          </Stack>
      </Box>
      ) : ( null )}
      
      <Snackbar
        open={error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="info" sx={{ width: "100%" }} onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Drawer>
    
  );
};

export default Car;