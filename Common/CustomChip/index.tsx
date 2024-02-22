import React from 'react'
import { Box, Typography } from '@mui/material'


type CustomChiptype = {
    label:string;
    color:string;
    backgroundColor:string
}

const CustomChip = ({label,color,backgroundColor}:CustomChiptype) => {
  return (
    <Box  sx={{borderRadius:3,color,backgroundColor}} >
    <Typography variant="body1" sx={{fontSize:12,mx:1,my:0.2,fontWeight:600}} >{label}</Typography>
   </Box>
  )
}

export default CustomChip