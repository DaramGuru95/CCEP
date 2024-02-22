import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
    handlingTime:string
}

const AverageHandelingTime = (props: Props) => {
  return (
   <Box>
     <Typography variant='h4'>{props.handlingTime}</Typography>
   </Box>
  )
}

export default AverageHandelingTime