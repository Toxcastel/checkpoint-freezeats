import React from 'react'
import {Box,Typography, Avatar} from '@mui/material';
import iconLike from "../assets/iconLike.png"



const Resume = () => {
  return (
    <Box
      sx={{
        width: "auto",
        height: "100vh",
        backgroundColor: '#b2dfdb',
      }}
    >
      <Box sx={{
        display:"flex",
        flexDirection:"column",
        alignItems: 'center',
        py:20,
        textAlign:"center"
      }}>
        <Typography variant="h2" sx={{mb:10}}>
          ¡Gracias por su compra!
        </Typography>
        <Avatar
            variant="square"
            src={iconLike}
            sx={{ width: 300, height: 300, mr: 2 }}
          ></Avatar>
      </Box>
    </Box>
  )
}

export default Resume