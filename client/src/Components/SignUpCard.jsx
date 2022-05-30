import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";

export default function SignUpCard() {
    return (
        <Card>
            <Typography variant="h4"> Sign Up </Typography>
        
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
                Sign Up
            </Button>

        </Card>
    )
}