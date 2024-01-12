// Packages
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useHooks } from '../../hooks';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const hooks = useHooks();
  const [authType, setAuthType] = useState(hooks.user_id ? "logout" : "login")
  const [state, setState] = useState({});

  const handleChange = (event) => setState({ ...state, [event.target.name]: event.target.value });
  console.log("Auth Form: ", hooks)

  const toggleAuth = (auth) => setAuthType(auth)
  const forgotPassword = () => {
    console.log("Forgot Password", hooks, state)
    hooks.auth.methods.resetPassword(state.email);
  }

  const handleSubmit = () => {
    console.log("Auth Form: ", state, authType)
    return ({
      login: hooks.auth.methods.login(state),
      logout: hooks.auth.methods.logout(),
      signup: hooks.auth.methods.signup(state),
    }[authType]);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          {{login: "Sign in", logout: "Sign out", signup: "Sign up"}[authType]}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={state?.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={state?.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {{login: "Sign in", logout: "Sign out", signup: "Sign up"}[authType]}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={forgotPassword} sx={{ color: "#fff" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => toggleAuth("signup")} sx={{ color: "#fff" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}