import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth(props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error)
                throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

  return (

    <Grid container>

        <Grid item xs="3"> </Grid>

        <Grid item xs="6">

            <Typography variant="h4" sx={{margin: "10px"}}> Sign in </Typography>
                    
            <Box component="form" sx={{flexDirection: 'row'}}>

                <TextField
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{display: 'block', margin: '10px'}}
                />

                <TextField
                    required
                    fullWidth
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{display: 'block', margin: '10px'}}
                />

            </Box>

            <Button
                variant="contained"
                onClick={() => alert("lol, your password is " + password)}
                sx={{display: 'inline', margin: '10px'}}
                // onClick={() => handleLogin()}
            >
                Log in
            </Button>

            <Button
                variant="contained"
                onClick={() => props.setSession(true)}
                sx={{display: 'inline', margin: '10px'}}   
            >
                Magical Admin Log In Button
            </Button>
        </Grid>

        <Grid item xs="3"> </Grid>


    </Grid>
  )
}