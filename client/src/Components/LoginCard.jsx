import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";

import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from "../supabase";
import { useAuth } from './Contexts/Auth'

export default function LoginCard() {
    
    const emailRef = useRef();
    const passwordRef = useRef();
  
    const [error, setError] = useState(true); // TODO: Figure out why the default value can be true.
    // Is this error overridden by the error in line 31?

    function signIn(data) {
        return supabase.auth.signIn(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const {user, session, error} = await signIn({email, password});

        if (error) {
            setError(error); // TODO: Find out what else could cause an error here.
            alert("Wrong password!");
        }

    }

    return (
        <Card sx={{p: 3, mr: 1}}>
            <Typography variant="h4" sx={{pb: 1}}> Log In </Typography>

            <TextField
                    required
                    label="Email"
                    inputRef={emailRef}
                    sx={{display: 'block', py: 1}}
            />

            <TextField
                required
                type="password"
                label="Password"
                inputRef={passwordRef}
                sx={{display: 'block', py: 1}}
            />

            <Button
                variant="contained"
                sx={{display: 'block'}}
                onClick={handleSubmit}
            >
                Log in
            </Button>
        </Card>
    )
}