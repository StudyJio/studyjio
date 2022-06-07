import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Card } from '@mui/material'
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import { supabase } from '../supabase'
import LoginCard from './LoginCard'
import SignUpCard from './SignUpCard'

export default function Auth(props) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function SignedOutPage(e) {
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

    function LoginBesideSignUp() {
        return (<Grid container>
            <Grid item xs="5.5"> <LoginCard /> </Grid>
            <Grid item xs="1"> </Grid>
            <Grid item xs="5.5"> <SignUpCard /> </Grid>
        </Grid>);
    }

    function LoginAboveSignUp() {
        return (<>
            <LoginCard />
            <SignUpCard />
        </>);
    }

    return (

        <Grid container>

            <Grid item xs="1" lg="3">
                {/* Left margin. */}
            </Grid>

            <Grid item xs="10" lg="6">

                <Typography variant="h3" sx={{ marginTop: "60px" }}> StudyJio </Typography>

                <Typography sx={{ py: 2 }}>
                    The demo version of our web app is best experienced on wide screens.
                </Typography>

                <Box sx={{ display: {xs: 'block', md: 'none'}}}>
                    <LoginAboveSignUp />
                </Box>

                <Box sx={{ display: {xs: 'none', md: 'block'}}}>
                    <LoginBesideSignUp />
                </Box>

                <Button
                    variant="contained"
                    onClick={() => props.setSession(true)}
                    sx={{ display: 'inline', my: 3 }}
                >
                    Magical Admin Log In Button
                </Button>

            </Grid>

            <Grid item xs="1" lg="3">
                {/* Right margin. */}
            </Grid>


        </Grid>
    )
}