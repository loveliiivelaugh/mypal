// Packages
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


// Constants
const { REACT_APP_SUPABASE_URL: url, REACT_APP_SUPABASE_KEY: key } = process.env;
const supabase = createClient(url, key)


export default function Login() {
  // State / Hooks
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

  console.log({ session })

  // Render
  if (!session) return (
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  )
  else return ( <div>Logged in!</div> )

}