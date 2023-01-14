import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginApiCall } from '../../code/hooks/useApi'
import Alert from '@mui/material/Alert'

/**
 * Component for displaying the login form. It has 2 text fields for username and password and a button for submitting the form.
 * If the login is not successful, there should be message "Invalid credentials.".
 */

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)

  const loginMutation = useMutation({
    mutationFn: loginApiCall,
    onSuccess: (data) => {
      localStorage.setItem('authtoken', data.access_token)
      window.location.reload()
    },
    onError: () => {
      setLoginError(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ LoginDto: { username, password } })
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          id='outlined-basic'
          label='Username*'
          name='username'
          variant='outlined'
          style={{ margin: '20px 0', width: 300 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          id='outlined-basic'
          label='Password'
          name='password'
          variant='outlined'
          style={{ width: 300 }}
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type='submit'
          variant='contained'
          style={{ margin: '20px 0', width: 300 }}
          disabled={loginMutation.isLoading}
        >
          Submit
        </Button>

        {loginError && <Alert severity='error'>Invalid credentials</Alert>}
      </form>
    </Box>
  )
}
