import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Input } from "@mui/material";
import { Popover } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { supabase } from "../supabase";
import bcrypt from "bcryptjs";
import DefaultProfilePhoto from "./DefaultProfilePhoto.jpg";


export default function MyAccount() {

  const user = supabase.auth.user();

  /** =============================================================================================
   * Variables and functions used by the user's display name field.
   */

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    async function fetchUserDisplayName() {
      let { data, error } = await supabase
        .from('user_profiles')
        .select('*') // We potentially want to get other types of information from the table user_profiles.
        .eq("id", user.id);
      return data[0];
    }
    
    fetchUserDisplayName()
      .then(data => {
        setDisplayName(data.display_name)
      })
      .catch(console.error)
  }, [])


  async function handleChangeDisplayName(event) {
    // Locally change what is shown in the TextField.
    setDisplayName(event.target.value);
  }

  async function handleSaveProfileChanges(event) {
    // Prevent the page from refreshing.
    event.preventDefault();

    const dataToWrite = {
      id: user.id,
      updated_at: new Date(),
      display_name: displayName,
    };

    // Update the database.
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(dataToWrite)
      .eq('id', user.id)

    alert("Your changes have been saved.")
  }

  /**
   * Variables and functions used by the popover menu which opens when the profile picture is clicked.
   */

  // The element (El) to which the popover menu is anchored. When the element is null, the popover menu is not displayed.
  const [anchorEl, setAnchorEl] = useState(null);

  const isProfilePictureMenuOpen = Boolean(anchorEl);

  const profilePictureMenuId = isProfilePictureMenuOpen
    ? "profile-picture-menu"
    : undefined;

  
  const usernameInputRef = useRef();
  // const emailInputRef = useRef();
  // const oldPasswordInputRef = useRef();
  // const newPasswordInputRef = useRef();
  // const confirmNewPasswordInputRef = useRef();

  // Save username changes to Supabase upon clicking "Save Changes"
  const saveUsernameHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;

    const userData = {
      username: enteredUsername,
      updated_at: new Date(),
      id: user.id,
    };

    console.log(userData);

    
    const { data, error } = await supabase.from("profiles").upsert(userData, {
      returning: "minimal", // Don't return the value after inserting
    });
  };

  // const resetPasswordHandler = async (event) => {
  //   event.preventDefault();

  //   // const oldPassword = oldPasswordInputRef.current.value
  //   const email = emailInputRef.current.value;
  //   const newPassword = newPasswordInputRef.current.value;
  //   const confirmNewPassword = confirmNewPasswordInputRef.current.value;

  //   console.log(user.id);

  //   // if (user.encrypted_password !== bcrypt(oldPassword, supabase.auth.users.encrypted_password)) {
  //   if (user.email !== email) {
  //     console.log("Invalid Email!");
  //   } else {
  //     console.log("Success!");
  //     if (newPassword === confirmNewPassword) {
  //       const { user, error } = await supabase.auth.update({
  //         password: { newPassword },
  //       });
  //     }
  //   }
  // };

  // When the profile picture is clicked, ...
  function handleClickProfilePicture(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseProfilePictureMenu() {
    setAnchorEl(null);
  }

  function handleClickRemovePicture() {
    // TODO: Delete the user's current profile picture from the database.
    //       (Ensure that the the default profile picture is now displayed.)

    // Close the popover menu.
    handleCloseProfilePictureMenu();
  }

  /**
   * Variables and functions for saving the new profile picture that is uploaded by the user. ===
   */

  const [selectedFile, setSelectedFile] = useState(); // Eventually contains the new picture.
  const [isFilePicked, setIsFilePicked] = useState(false); // Remove if not needed, probably.

  function handleChangeProfilePicture(event) {
    console.log("The function handleChangeProfilePicture was called.");

    // Set `selectedFile` to the selected file, and record that the file is picked.
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);

    // TODO: Save the image to the database.
    handleSubmission();
  }

  function handleSubmission() {
    console.log("The function handleSubmission was called.");

    const formData = new FormData();
    formData.append("File", selectedFile);

    fetch("https://raqxffxcknwwrzqjpemc.supabase.co", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success: ", result);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .then(() => {
        // Update the user interface to display the new profile picture from the server.
      })
      .then(() => {
        // Reset `selectedFile` and `isFilePicked` to `null` and `false` respectively to allow the
        // user to change their profile picture more than one time.
        console.log("selectedFile and isFilePicked have been reset.");
        setSelectedFile(null);
        setIsFilePicked(false);
      });
  }

  /**
   * Return statement ===========================================================================
   */

  return (
    <>
      <Typography variant="h4"> My Account </Typography>

      <Paper sx={{ my: 2, p: 2, width: 300 }}>
        <form onSubmit={handleSaveProfileChanges}>
          <Box display="flex" justifyContent="center">
            <Avatar
              // src= TODO: Get the user's profile picture from Supabase.
              style={{ width: 150, height: 150 }}
              onClick={handleClickProfilePicture}
            />

            <Popover
              id={profilePictureMenuId}
              open={isProfilePictureMenuOpen}
              anchorEl={anchorEl}
              onClose={handleCloseProfilePictureMenu}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
              }}
              sx={{
                flexFlow: "column wrap",
              }}
            >
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleChangeProfilePicture}
                />
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ m: 1 }}
                  startIcon={<UploadFileRoundedIcon />}
                >
                  Upload Photo...
                </Button>
              </label>

              <Button
                startIcon={<DeleteRoundedIcon />}
                variant="outlined"
                sx={{ m: 1 }}
                onClick={handleCloseProfilePictureMenu}
              >
                Remove photo
              </Button>
              <Typography sx={{m: 1}}>
              We have not yet implemented writing and reading profile pictures to and from our database.
          </Typography>
            </Popover>
          </Box>
          
          <TextField
            value={displayName}
            variant="standard"
            label="Display Name"
            fullWidth
            onChange={handleChangeDisplayName}
            sx={{
              display: "block",
              my: 2,
              input: { textAlign: "center" },
            }}
          />
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </form>
      </Paper>

      <Paper sx={{ my: 2, p: 2, width: 300 }}>
        {/* <form onSubmit={resetPasswordHandler}> */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          {" "}
          Change Password{" "}
        </Typography>

        <TextField
          // inputRef={oldPasswordInputRef}
          label="Current Password"
          type="password"
          fullWidth
          sx={{ display: "block", mb: 1 }}
        />

        <TextField
          // inputRef={newPasswordInputRef}
          label="New Password"
          type="password"
          fullWidth
          sx={{ display: "block", mb: 1 }}
        />

        <TextField
          // inputRef={confirmNewPasswordInputRef}
          label="Confirm New Password"
          type="password"
          fullWidth
          sx={{ display: "block", mb: 1 }}
        />

        <Typography sx={{mb: 1}}>
            This feature is not yet implemented.
        </Typography>

        <Button disabled variant="contained">
          Reset Password
        </Button>
      </Paper>

      {/* <Button variant="contained">Sign Out</Button> */}
    </>
  );
}
