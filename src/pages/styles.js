import { createTheme } from "@material-ui/core";

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
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Karla",

    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
