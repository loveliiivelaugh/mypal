// Packages
import { useState, useEffect } from 'react'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

// Utilities
import { useHooks } from '../../hooks'
import { supabase } from '../../db'


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

  const handleProfileClick = () => {
    hooks.actions.handleSelected(hooks.profile.current_profile)
    hooks.actions.updateDrawers({ active: "profile", anchor: "top", open: true })
  }

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
    <Box sx={{ color: "#fff", display: "flex" }}>
      <Typography variant="body1" component="p" gutterBottom p={1} mt={1}>
        {/* {hooks.auth.email} */}
        <IconButton onClick={handleProfileClick} sx={{ color: "#fff"}}>
          <Avatar alt="M" src={"M"} sx={{ width: 24, height: 24, bgcolor: 'rgba(80, 170, 255, 1)' }} variant='square' />
        </IconButton>
      </Typography>
      <Tooltip title="Logout">
        <IconButton onClick={() => hooks.actions.updateDrawers({ active: "auth", anchor: "right", open: true })} sx={{ color: "#fff" }}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )

}