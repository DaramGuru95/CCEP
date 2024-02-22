import React, { Children } from 'react';
import {Box,Paper,Typography,IconButton} from '@mui/material'

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const CustomWindow = ({children,windowTitle,titleIcon}:{children: React.ReactNode,windowTitle:string,titleIcon:any}) => {
  return (
    <Box width={"25vw"} height={"90vh"} component={Paper} elevation={1}>
        <Box
          height={"10vh"}
          width={"100%"}
          component={Paper}
          elevation={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={'space-between'}
          padding={1}
        >
          <Box display={'flex'} gap={2}>
           {titleIcon}
            <Typography variant="subtitle2" sx={{fontWeight:'bold'}}>{windowTitle}</Typography>
          </Box>
          <Box>
             <IconButton /*onClick={function}*/><MoreVertOutlinedIcon/></IconButton>
          </Box>
        </Box>
        <Box margin={1} padding={1}>
        {
            children
        }
        </Box>
      
      </Box>
  )
}

export default CustomWindow