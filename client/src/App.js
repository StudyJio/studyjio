import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Components/Auth'
import Dashboard from './Components/Dashboard'
import { Box } from '@mui/material'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Box>
      {!session ? <Auth setSession={setSession} /> : <Dashboard />}
    </Box>
  )
}