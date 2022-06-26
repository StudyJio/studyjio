import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";

import { useRef, useState } from 'react'
import { supabase } from "../supabase";


export default function SignUpCard() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [error, setError] = useState(true);

    function signUp(data) {
        return supabase.auth.signUp(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Check that the 'Confirm Password' entered matches the 'Password' entered.
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert("Passwords do not match!")
            return;
        }

        const email = emailRef.current.value;       // a String
        const password = passwordRef.current.value; // a String

        const res = await signUp({email, password});

    }

    return (    
        <Card sx={{p: 3}}>
            
            <Typography variant="h4" sx={{pb: 1}}> Sign Up </Typography>
        
            <TextField
                id="sign-up-card-email-input"
                required
                fullWidth
                label="Email"
                inputRef={emailRef}
                sx={{display: 'block', py: 1}}
            />

            <TextField
                id="sign-up-card-password-input"
                required
                fullWidth
                type="password"
                label="Password"
                inputRef={passwordRef}
                sx={{display: 'block', py: 1}}
            />

            <TextField
                id="sign-up-card-confirm-password-input"
                required
                fullWidth
                type="password"
                label="Confirm Password"
                inputRef={confirmPasswordRef}
                sx={{display: 'block', py: 1}}
            />

            <Button
                id="sign-up-card-submit-button"
                variant="contained"
                sx={{display: 'block'}}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>

        </Card>
    )
}