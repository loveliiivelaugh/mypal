// Packages
import { useMemo } from 'react'
import { createTheme, CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@emotion/react'
import { motion } from 'framer-motion'

// Hooks
import { useColorMode } from '../hooks'

// Utitlities
import { themeConfig } from './themeConfig'


const useTheme = ({ mode }) => useMemo(() => createTheme({
  ...themeConfig,
  ...themeConfig[mode],
}), [mode])

export const ThemeProvider = ({ children }) => {
  const [mode, toggle] = useColorMode()
  const theme = useTheme({ mode })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { 
          opacity: 0,
          transition: { duration: 0.35 }
        }
      }}
    >
      {children}
    </motion.div>
  )
}
