import React from "react";
// import Header from "../assets/SVG/Recurso 2.svg";
import styled from "styled-components";
import Navbarlanding from "../../components/Navbarlanding";
import { ThemeProvider } from "styled-components";
import { ThemesLanding } from "../../components/ThemesLanding";

const Landingpage = () => {
  return (
    <Landingpages>
      <ThemeProvider theme={ThemesLanding}>
        <div className="headersection">
          <img className="imgtopheader" alt="" />
        </div>

        <Navbarlanding />
      </ThemeProvider>
    </Landingpages>
  );
};

const Landingpages = styled.div`
  width: 100%;
  .headersection {
    width: 100%;
  }

  .navbarheader {
    width: 100%;
    height: 75px;
    z-index: 100;
  }

  .imgtopheader {
    position: absolute;
    top: -7px;
    right: 0;
    width: 55vw;

    z-index: -1;
  }
`;

export default Landingpage;
