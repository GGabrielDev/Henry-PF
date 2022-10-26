import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

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
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
