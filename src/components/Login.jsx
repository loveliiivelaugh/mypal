// Packages
import { useState, useEffect } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

// Utilities
import { useHooks } from '../hooks'
import { supabase } from '../db'


export default function Login() {
  // State / Hooks
  const hooks = useHooks();
  const [session, setSession] = useState(null)

  // Effects
  useEffect(() => {

    supabase
      .auth
      .getSession()
      .then(({ data: { session } }) => setSession(session))

    const {data: { subscription }} = supabase
      .auth
      .onAuthStateChange((_event, session) => setSession(session))

    return () => subscription.unsubscribe()

  }, [])

  // console.log({ session })

  // Render
  // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  if (!session) return (
    <Tooltip title="Login">
      <IconButton onClick={() => hooks.actions.updateDrawers({ active: "auth", anchor: "right", open: true })} sx={{ color: "#fff"}}>
        <LoginIcon />
      </IconButton>
    </Tooltip>
  )
  else return (
    <Box sx={{ color: "#fff" }}>
      {hooks.auth.email}
      <Tooltip title="Logout">
        <IconButton onClick={() => hooks.actions.updateDrawers({ active: "auth", anchor: "right", open: true })} sx={{ color: "#fff" }}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )

}