import React, { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";


const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [notification, setNotification] = useState(""); // Define the setNotification state


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://jap.digisole.in/api/v1/auth/login', {
        email,
        password,
      });
  
      console.log('Login successful:', response.data);
      setNotification('Login successful!'); // Set the success notification message
  
      // Store the access token in local storage
      console.log('Access token:', response.data.token);
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('login_', '1');

  
      // Redirect to home page
      window.location.href = '/'; // Replace '/home' with the actual URL of your home page
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data);
        setLoginError(error.response.data.message);
        // Handle error response
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            maxWidth: "510px",
            ml: "auto",
            mr: "auto",
            padding: "50px 0 100px",
          }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
          <img
                  src="/images/logo.png"
                  alt="favicon"
                  className="my_logo" 
                  style={{width: "100px"}}
                /><br/>
            <Box>
            

          

              

              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Box
                  sx={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Email
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                        onChange={handleEmailChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Remember me."
                    />
                  </Grid>

              
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "12px 10px",
                    color: "#fff !important",
                  }}
                  setNotification={setNotification}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SignInForm;
