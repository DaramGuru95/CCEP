import React, { Fragment } from 'react'
// import Layout from '../Layout'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <Fragment>
        <h1>Root Layout</h1>
        <Outlet />
    </Fragment>
  )
}

export default Root