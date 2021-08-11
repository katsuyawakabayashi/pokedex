import { createTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

export const theme = createTheme({
  palette: {
    background: {
      default: "#111",
    },
    // primary: {
    //   main: "#303030",
    // },
    // secondary: {
    //   main: "#C5AB63",
    // },
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    optional: {
      light: green[500],
      main: green[500],
      dark: green[500],
      contrastText: "#000",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
