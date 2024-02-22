import React, { Fragment } from 'react'
import Layout from '../Layout'
import { Box } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Error from './Error'

const ErrorLayout = () => {
  return (
    <Fragment>
       <Layout />
        <Error />

    </Fragment>
  )
}

export default ErrorLayout