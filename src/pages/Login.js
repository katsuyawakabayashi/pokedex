import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
  Alert,
  CssBaseline,
  Paper,
  Card,
  ButtonGroup,
  Container,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { history, login } = useAuth();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Paper
          color="primary"
          style={{
            padding: 50,
            border: "1px solid black",
            backgroundColor: "gray",
          }}
        >
          <form onSubmit={handleSubmitSignup}>
            {error && <div>{error}</div>}

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={5}
            >
              <Grid item xs={12}>
                <Typography variant="h4">Login</Typography>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="password"
                  id="pwd"
                  name="pwd"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Button size="small" variant="contained" color="secondary">
                    Signup
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
