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
import { tryCatchHandler } from '../../utilities/helpers';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


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

  const handleChange = (event) => setState({ 
    ...state, 
    [event.target.name]: event.target.value 
  });
  console.log("Auth Form: ", hooks)

  const toggleAuth = (auth) => {
    hooks.actions.closeDrawers();
    setAuthType(auth);
    hooks.actions.updateDrawers({
      active: "auth",
      anchor: "right",
      open: true,
    });
  }

  const forgotPassword = () => {
    console.log("Forgot Password", hooks, state)
    hooks.auth.methods.resetPassword(state.email);
    hooks.actions.closeDrawers();
  }

  const formattedAuthType = ({
    login: "Sign in", 
    logout: "Sign out", 
    signup: "Sign up"
  }[authType])

  const handleSubmit = () => {
    console.log("Auth Form: ", state, authType)
    tryCatchHandler(
      // try
      () => ({
        login: hooks.auth.methods.login(state),
        logout: hooks.auth.methods.logout(),
        signup: hooks.auth.methods.signup(state),
      }[authType]),
      // finally
      () => {
        hooks.actions.closeDrawers();
        hooks.auth.refetch();
        hooks.actions.createAlert("success", `${formattedAuthType} successful!`);
      }
    )
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box p={2} mt={2}>
        <IconButton onClick={() => hooks.actions.closeDrawers()} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
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
          {formattedAuthType}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {(authType === "logout") ? (
            <Typography component="h1" variant="h5">
              Are you sure you want to leave?
            </Typography>
          ) : (
            <>
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
            </>
          )}
          <Button
            fullWidth
            variant={"contained"}
            color={(authType === "logout") ? "error" : "primary"}
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {formattedAuthType}
          </Button>

        {(authType !== "logout") && (
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={forgotPassword} sx={{ color: "#fff" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                href="#" 
                variant="body2" 
                onClick={() => (authType === "login") 
                  ? toggleAuth("signup") 
                  : toggleAuth("login")
                } 
                sx={{ color: "#fff" }}
              >
                {(authType === "login") 
                  ? "Don't have an account? Sign Up" 
                  : "Already have an account? Sign in"
                }
              </Link>
            </Grid>
          </Grid>
        )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}