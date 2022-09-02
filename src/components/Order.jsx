import React, { useEffect, useState } from 'react'
import {Box,Typography,Avatar,Divider,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel, Button, Stack} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrder, fetchOrder } from '../store/reducers/orderReducer';
import Address from './Address';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Order = () => {

    const order = useSelector((state) => state.order);
    const {info:products} = useSelector((state) => state.order);
    const {address} = useSelector((state) => state.order);
    const envio = 500
    const dispatch = useDispatch();
    const [value, setValue] = useState('Efectivo');
    const [orderInfo, setOrderInfo] = useState(products);
    const [addressInfo, setAddressInfo] = useState(address);
  

    console.log("orderAddress",address);

    const navigate = useNavigate()

    const [shipping, setShipping] = React.useState('Retiro en sucursal');

    const handleShipping = (event) => {
      setShipping(event.target.value);
    };

    useEffect(() => {
        setOrderInfo(products);
    }, [order]);

    useEffect(() => {
        setAddressInfo(address);
    }, [order]);

    

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.put("api/order/payment",{
            paymentMethod: value,
        })
        axios.put("api/order/shipping",{
            shippingMethod: shipping,
        })
        axios.put("api/order/checkout").catch((err)=>{console.log(err)})
    }

    const handleRejected = (e)=>{
        e.preventDefault()
        axios.put("api/order/rejected").catch((err)=>{console.log(err)})
        navigate("/")
    }


    
  return (

    <Box
    sx={{
      display:"flex",
      width: "auto",
      height: "100%",
      backgroundColor: '#b2dfdb',
      textAlign:{xs:"center",sm:"left",md:"left", lg:"left"}
    }}
    >
    
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      ml:{xs:"2%",sm:"5%",md:"10%"}, 
      width:"50%"
      }}>
      <Typography variant="h4" sx={{mt:10}}>
            Opciones de envío a
      </Typography>
      
        <FormControl sx={{mt:4,mb:2}}>
          <FormLabel id="demo-controlled-radio-buttons-group">¿Qué prefieres?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={shipping}
            onChange={handleShipping}
          >
            <FormControlLabel value="retiro" control={<Radio />} label="Retiro en sucursal" />
            <FormControlLabel value="envio" control={<Radio />} label="Envío" />
          </RadioGroup>
        </FormControl>
      {shipping === "envio" ? (
        !address.number ? (
        <>
        <Box sx={{
          display:"flex",
          flexDirection:{xs:"column", sm:"column", md:"row"},
          textAlign:{xs:"center",sm:"center",md:"left"},
          alignItems:"center",
          justifyContent:"center",
          backgroundColor:"#e0f2f1",
          my:4,
          p:2
          }}>
         <Address/>
        </Box>
        </>
    ):(
        <>
            <Box sx={{
            display:"flex",
            flexDirection:{xs:"column", sm:"column", md:"row"},
            textAlign:{xs:"center",sm:"center",md:"left"},
            alignItems:"center",
            backgroundColor:"#e0f2f1",
            my:4,
            p:2
            }}>
            <Avatar src="https://marketplace.canva.com/FUmOY/MAEPzDFUmOY/1/tl/canva-green-location-pin-icon-MAEPzDFUmOY.png" variant="square" sx={{width:40, height:40, pl:1}}>
            </Avatar>
            <Box sx={{
                p:2
                }}>
                <Typography variant="h6">
                {address.street} {address.number}
                </Typography>
                <Typography variant="subtitle1">
                C.P. {address.postalCode} - {address.city}, {address.province}
                </Typography>
            </Box>
                <Divider variant="inset" />
            </Box>
        </>
    )
      ):(null)
     }
      
      
      <Typography variant="h4" sx={{}}>
            Productos
      </Typography>
    
      
      <Box sx={{
            display:"flex",
            flexDirection:"column",
            backgroundColor:"white",
            my:4,
            p:2,
            borderRadius:5,
            boxShadow: 2
            }}>
 
        {orderInfo? (
            orderInfo.map((item) => {
                return(
                    <>
                    <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    my:1,
                    p:1,
                    flexDirection:{xs:"column",sm:"colum",md:"row"},
                    textAlign:{xs:"center", sm:"center",md:"left"}
                    }}>
                    <Avatar src={item.imgUrl} sx={{width: 80, height: 80,}}>
                    </Avatar>
                    <Box sx={{
                        p:2,
                        width:"100%"
                        }}>
                        <Typography variant="h6">
                            {item.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            {item.description}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"flex-end",
                        width:"100%",
                        pl:{xs:0,sm:0,md:5,lg:25},
                        }}>
                        <Typography variant="h6">
                            ${item.price}
                        </Typography>
                        <Typography variant="subtitle3">
                        cantidad: {item.quantity}
                        </Typography>
                    </Box>
                    </Box>    
                    <Divider variant="inset" />      
                    </>    
                )
            })
        ):(null)}
      </Box>
    

        <Typography variant="h4" sx={{}}>
              Formas de pago
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>

        
       <Box sx={{
        display:"flex",
        alignItems:"center",
        backgroundColor:"#e0f2f1",
        my:4,
        p:2
        }}
        >

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Elige tu forma de pago</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="efectivo" control={<Radio />} label="Efectivo" />
            <FormControlLabel value="debito" control={<Radio />} label="Tarjeta de débito" />
            <FormControlLabel value="credito" control={<Radio />} label="Tarjeta de crédito" />
            <FormControlLabel value="mercadopago" control={<Radio />} label="Mercado Pago" />
          </RadioGroup>
        </FormControl>
      </Box>

        <Box sx={{
            display:"flex",
            justifyContent:{xs:"center", sm:"flex-end",md:"flex-end"},
            my:2
            }}>
            <Stack spacing={2} direction="row">
            
              <Button variant="outlined" size="medium" sx={{
              color:"#004d40",
              borderColor: "#004d40",
              ":hover": {
                  outline: "none",
                  borderColor: "#009688",
              },
              ":focus": {
                outline: "none",
                borderColor: "#004d40",
              },
              }} onClick={handleRejected}>Cancelar Compra</Button>
            <Link to="/resume">
            <Button variant="contained" size="medium" sx={{
            backgroundColor:"#004d40",
            ":hover": {
                backgroundColor: "#009688",
            },
            ":focus": {
              outline: "none",
              borderColor: "#004d40",
          },
            }} type="submit" >Finalizar Compra</Button>
            </Link>
            </Stack>
            
            
        </Box>
        </Box>
    </Box>


   

    <Box sx={{
      display:"flex",
      flexDirection:"column",
      backgroundColor:"#00796b",
      justifyContent: 'flex-start',
      ml:{xs:0.5,sm:5,md:10},
      p:2,
      textAlign:"left",
      color:"white"
      
    }}>
        <Typography variant="h5" sx={{mt:8,mb:1, color:"white", fontWeight: 'bold'}}>
              Resumen de compra
        </Typography>
        <Divider variant="middle" />
        <Box sx={{
            display:"flex",
            justifyContent:{xs:"space-around", sm:"space-between"}
          }}>
          <Typography variant="body1" sx={{my:2}}>
                Productos({orderInfo.length})
          </Typography>
          <Typography variant="body1" sx={{my:2}}>
                ${order.total}
          </Typography>
        </Box>
        <Box sx={{
            display:"flex",
            justifyContent:"space-between"
          }}>
          <Typography variant="body1" sx={{my:2}}>
                Envío
          </Typography>
          <Typography variant="body1" sx={{my:2}}>
                $500
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{
            display:"flex",
            justifyContent:"space-between"
          }}>
          <Typography variant="body1" sx={{my:2}}>
                Total
          </Typography>
          <Typography variant="body1" sx={{my:2}}>
                ${order.total+envio}
          </Typography>
        </Box>

    </Box>

  </Box>
  )
}

export default Order