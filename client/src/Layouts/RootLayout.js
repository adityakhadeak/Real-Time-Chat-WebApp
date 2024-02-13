import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { Grid, GridItem } from '@chakra-ui/react'

const RootLayout = () => {
  return (
    <Grid height="100vh"
      templateRows='auto 1fr'    >
      <GridItem>
        <NavBar />
      </GridItem>
      <GridItem>
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default RootLayout
