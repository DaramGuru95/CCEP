import { Grid, Typography } from '@mui/material'
import React from 'react'

type Props = {}

const Error = (props: Props) => {
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '85vh',
    }}
  >
    <Grid item xs={12} md={12}>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        {"Page Not Found !"}
      </Typography>
    </Grid>
  </div>
  )
}

export default Error