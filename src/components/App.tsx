import { Container } from '@mui/material'
import Login from './login/Login'
import Map from './map/Map'
import { useState } from 'react'

/**
 * This component is the root component of the application.
 * It should display the login form if the user is not logged in and the map if the user is logged in (there is no router).
 */
function App() {
  const loggedIn = localStorage.getItem('authtoken')

  if (!loggedIn) {
    return (
      <Container component='main' maxWidth='xs'>
        <Login />
      </Container>
    )
  }

  return (
    <Container component='main'>
      <Map />
    </Container>
  )
}

export default App
