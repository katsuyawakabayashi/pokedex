import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    background: {
      default: "#111",
    },
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#C5AB63",
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
