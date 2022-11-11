import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter, useHref } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { Themes } from "./components/Tugamer/Theme/Theme";
import {Auth0Provider} from "@auth0/auth0-react"


const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		text-decoration: none;
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
	}

	*:focus {
		outline: none;
}
`;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode> 
    <Auth0Provider domain="dev-n1wylph86zq3zbjr.us.auth0.com" clientId="5NIb6mwiSfv2dE7L4A6hkms8kMnONhbk" redirectUri={window.location.origin}  >  
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={Themes}>
          <Provider store={store}>  
            <App />  
          </Provider>
        </ThemeProvider>
      </BrowserRouter>  
    </Auth0Provider>    
  </React.StrictMode>
);

reportWebVitals();
