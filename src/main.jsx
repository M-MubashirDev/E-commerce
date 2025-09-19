import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store.js";

const theme = createTheme({
  colors: {
    light: ["#ffffff"],
    dark: ["#060607", "#101828"],
    gray: ["#484e52", "#afb9c5"],
    accent: ["#e3cdb3"],
  },
  primaryColor: "accent",
  primaryShade: 0,
  fontFamily: "Inter, sans-serif",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
