'use client'

import { Button, Link, Stack, TextField } from '@mui/material'
import NextLink from 'next/link'
import { useFormState } from 'react-dom'
import { login } from './login'

export default function Login() {
  const [state, formAction] = useFormState(login, { error: '' })

  return (
    <form action={formAction} className='w-full max-w-xs'>
      <Stack spacing={2}>
        <TextField
          error={!!state.error}
          helperText={state.error}
          label='Email'
          type='email'
          name='email'
          variant='outlined'
        />
        <TextField
          error={!!state.error}
          helperText={state.error}
          label='Password'
          type='password'
          name='password'
          variant='outlined'
        />
        <Button type='submit' variant='contained'>
          Login
        </Button>
        <Link component={NextLink} href='/auth/signup' className='self-center'>
          Signup
        </Link>
      </Stack>
    </form>
  )
}
