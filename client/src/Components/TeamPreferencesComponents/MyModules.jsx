import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

export default function MyModules(props) {

    // When the TextField is edited, update props.setUserModules.
    function handleOnChange(event) {
        props.setUserModules(event.target.value);
    }

    return (
        <>
            <Typography variant="h5" sx={{mb: 1}}>
                My Modules
            </Typography>

            <TextField
                fullWidth
                multiline
                placeholder={"Full module codes separated by line breaks"}
                onChange={handleOnChange}
                value={props.userModules}
            >
            </TextField>
        </>
    );
}