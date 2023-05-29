import React, { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


function Registration(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const redir=()=>{
    navigate('/login')
  }
  const navigate = useNavigate();
  const toast = useRef(null);

    const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'User Registered Successfully !!', life: 3000});
  }

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      let datas = {
        "email":data.get('email'),
        "password":data.get('password'),
        "password_confirmation":data.get('password_confirmation'),
        "name":data.get('name'),
        "tc":true
      }
      if(datas.email && datas.password && datas.password_confirmation && data.name !== '' && datas.password === datas.password_confirmation){
        let result= await axios.post(`http://localhost:8000/api/user/register`,datas)
        showSuccess()
        setTimeout(() => {
          navigate('/login')
        }, 3000);
        console.log(result)

      }else{
        showError()
      }

    } catch (error) {
      console.log('err',error)
      showError()
    }
 


  };

  return (
    <ThemeProvider theme={defaultTheme}>
                  <Toast ref={toast} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={redir} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Registration sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
