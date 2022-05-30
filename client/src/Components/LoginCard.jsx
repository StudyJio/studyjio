import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";

import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './Contexts/Auth'

export default function LoginCard() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
  
    const [error, setError] = useState(null)
    const { signIn } = useAuth();

    return (
        <Card>
            <Typography variant="h4"> Log In </Typography>

            <TextField
                    required
                    label="Email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    sx={{display: 'block', margin: '10px'}}
                />

            <TextField
                required
                type="password"
                label="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                sx={{display: 'block', margin: '10px'}}
            />

            <Button
                variant="contained"
                // onClick={() => alert("lol, your password is " + password)}
                sx={{display: 'inline', margin: '10px'}}
                // onClick={() => handleLogin()}
            >
                Log in
            </Button>

        </Card>
    )
}