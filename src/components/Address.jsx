import React, { useEffect, useState } from 'react'
import {Button,TextField,Box} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {useInput} from "../hooks/useInput";
import axios from 'axios';
import { fetchOrder, setOrder } from '../store/reducers/orderReducer';
import { useDispatch } from 'react-redux';

const Address = () => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const calle = useInput("calle");
    const numero = useInput("numero");
    const provincia = useInput("provincia");
    const ciudad = useInput("ciudad");
    const codigoPostal = useInput("codigoPostal");
    const dispatch = useDispatch();


    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put("api/order/address",{
            street: calle.value, number: numero.value, city: ciudad.value, province: provincia.value, postalCode: codigoPostal.value
        })
        .then((order)=>{
            dispatch(setOrder(order.data));
            handleClose()})
        .catch((err)=>{console.log(err)})
    }



  return (
    <>
    <Button variant="contained" size="small" sx={{
        backgroundColor:"#004d40",
        ":hover": {
            backgroundColor: "#009688",
        },
        ":focus": {
            outline: "none",
        },
        }}
        onClick={handleClickOpen}
        >Agregar dirección</Button>
      <Dialog
         sx={{maxWidth:{xs:400, sm:550}, height:500}}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box component="form" onSubmit={handleSubmit}>
            <DialogTitle id="responsive-dialog-title" sx={{textAlign:"center"}}>
            {"Agregar dirección de envío"}
            </DialogTitle>
            <DialogContent sx={{mx:7}}>
            <DialogContentText>
            
                <TextField id="outlined-basic" label="Calle" type="text" variant="outlined" {...calle} sx={{m:1}}/>
                <TextField id="outlined-basic" label="Número" type="number" variant="outlined" {...numero} sx={{m:1}}/>
                <TextField id="outlined-basic" label="Ciudad" type="text" variant="outlined" {...ciudad} sx={{m:1}}/>
                <TextField id="outlined-basic" label="Provincia" type="text" variant="outlined" {...provincia} sx={{m:1}}/>
                <TextField id="outlined-basic" label="Código postal" type="number" variant="outlined" {...codigoPostal} sx={{m:1}}/>

            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancelar
            </Button>
            <Button type="submit" autoFocus >
                Agregar
            </Button>
            </DialogActions>
        </Box>
    </Dialog>
    </>
  )
}

export default Address