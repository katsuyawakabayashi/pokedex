import {
  Button,
  Grid,
  Typography,
  CssBaseline,
  makeStyles,
  ButtonGroup,
  Link,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const Signup = () => {
  const { history, signup } = useAuth();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      color: "black",
    },
    image: {
      backgroundImage:
        "url(https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif)",
      backgroundRepeat: "no-repeat",

      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    login: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3f50b5",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    input: {
      width: "fitContent",
      height: "35px",
      outline: "none",
      border: "0.05rem solid",
      background: "transparent",
      textAlign: "center",
      borderRadius: "50px",
      color: "#fff",
      "&:focus": {
        border: "0.05rem solid #4caf50",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={7} className={classes.image} />
      <Grid item xs={12} sm={5} className={classes.login}>
        <form onSubmit={handleSubmitSignup}>
          {error && <div>{error}</div>}

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item>
              <Typography variant="h5">Signup</Typography>
            </Grid>
            <Grid item>
              <input
                className={classes.input}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
            </Grid>
            <Grid item>
              <input
                className={classes.input}
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
                <Button size="small" variant="contained">
                  <Link
                    component={RouterLink}
                    to="/login"
                    style={{ textDecoration: "none", color: "#111" }}
                  >
                    Login
                  </Link>
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ backgroundColor: "#4caf50" }}
                >
                  Signup
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;
