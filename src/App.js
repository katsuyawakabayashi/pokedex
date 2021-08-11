import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import theme from "./pages/styles";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <ThemeProvider theme={theme}>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </ThemeProvider>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
