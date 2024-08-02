'use client'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ReactNode } from 'react'
import darkTheme from './dark.theme'
import { AuthContext } from './auth/auth-context'

interface ProvidersProps {
  children: ReactNode
  authenticated: boolean
}

export default function Providers({ children, authenticated }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
