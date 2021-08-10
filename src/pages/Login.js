import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
  Alert,
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
    <form onSubmit={handleSubmitSignup}>
      {error && <div>{error}</div>}
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        ref={emailRef}
        required
      />
      <input
        type="password"
        id="pwd"
        name="pwd"
        placeholder="Password"
        ref={passwordRef}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
