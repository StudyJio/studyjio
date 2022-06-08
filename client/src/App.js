import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import SignedOutPage from './Components/SignedOutPage'
import SignedInPage from './Components/SignedInPage'
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
      {!session ? <SignedOutPage setSession={setSession} /> : <SignedInPage />}
    </Box>
  )
}