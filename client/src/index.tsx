import React from "react";
import dotenv from "dotenv";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Themes } from "./components/Tugamer/Theme/Theme";

dotenv.config();

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		text-decoration: none;
    font-family: 'Poppins', sans-serif;
	}

	*:focus {
		outline: none;
}
`;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <ThemeProvider theme={Themes}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
