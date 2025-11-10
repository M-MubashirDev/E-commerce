import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { persistor, store } from "./store.js";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

// Inter, Roboto, Work Sans, Lato, Montserrat, and Open Sans

//application font - DM Sans

const theme = createTheme({
  colors: {
    light: ["#ffffff"],
    dark: ["#000", "#212121"],
    gray: ["#e0e0e0", "#f5f5f5"],
    textGray: ["#4a5565"],
  },
  primaryColor: "gray",
  primaryShade: 0,
  fontFamily: "DM Sans, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
  },
  // 👇 This is where you set defaults
  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
        color: "dark",
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },
    Text: {
      defaultProps: {
        fw: 400,
        size: "sm",
        c: "dark",
      },
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="light"
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
        <Toaster position="top-right" reverseOrder={false} />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
