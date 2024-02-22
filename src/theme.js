import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0096C5",
    },
  },
  typography: {
    fontFamily: "Source Sans 3, sans-serif",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f0f2f2",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        contained: {
          backgroundColor: "#0096C5",
          fontSize: 14,
          padding: "0 1rem",
          textTransform: "none",
          boxShadow: "none",
          color: "#fff",
          "&:hover": {
            boxShadow: "none",
            // background: "inherit",
            // color: "inherit",
          },
        },
      },
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#001E27",
      },
    },
  },
});

export default theme;
