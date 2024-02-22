import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./Config/Routes";
import { ThemeProvider } from "@mui/material/styles";
import "./Config/i18n";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { store, persistor } from "./Config/Store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import CustomAlert from "./Common/Alert";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <CustomAlert />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
