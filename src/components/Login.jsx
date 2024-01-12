// Packages
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import { supabase } from '../db'
import { useHooks } from '../hooks'


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
    <IconButton onClick={() => hooks.actions.updateDrawers({ active: "auth", anchor: "right", open: true })}>
      <LoginIcon />
    </IconButton>
  )
  else return ( <div>Logged in!</div> )

}