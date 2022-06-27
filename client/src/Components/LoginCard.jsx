import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";

import { useRef, useState } from 'react'
import { supabase } from "../supabase";

export default function LoginCard() {
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const [loginErrorMessage, setLoginErrorMessage] = useState("");
  
    function signIn(data) {
        return supabase.auth.signIn(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const {user, session, error} = await signIn({email, password});

        if (error) {
            setLoginErrorMessage(error.message);
        }

    }

    return (
        <Card sx={{p: 3, mb: 3}} id="log-in-card">
            
            <Typography variant="h4" sx={{pb: 1}}> Log In </Typography>

            <TextField
                data-cy="log-in-card-email-input"
                required
                fullWidth
                label="Email"
                inputRef={emailRef}
                sx={{display: 'block', py: 1}}
            />

            <TextField
                data-cy="log-in-card-password-input"
                required
                fullWidth
                type="password"
                label="Password"
                inputRef={passwordRef}
                sx={{display: 'block', py: 1}}
            />

            <Button
                data-cy="log-in-card-submit-button"
                variant="contained"
                sx={{display: 'block'}}
                onClick={handleSubmit}
            >
                Log in
            </Button>

            <Typography sx={{ color: 'error.main', pt: 2 }}>
                {loginErrorMessage}
            </Typography>
        </Card>
    )
}