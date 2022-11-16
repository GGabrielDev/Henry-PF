import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Footerlanding from "../components/Footerlanding";
import { ThemesLanding } from "../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import ContactSection from "../components/Contact";

const Sugerencias = () => {
  return (
    <Privacidat>
      <ThemeProvider theme={ThemesLanding}>
        <div className="Terminosycondiciones">
          <div className="headerterms">
            <Link to="/">
              <h1>Henryshops</h1>
              {/* <img src={logo} alt="" /> */}
            </Link>
          </div>
          <div className="Terminostitle">
            <h1>Sugerencias</h1>
            <p>
              Dejanos saber lo que piensas. En HenryShops siempre estamos
              dispuestos a escucharte.
            </p>
            <p>Tu opinion es muy importante para nosotros.</p>
          </div>
          <div className="Terminostext">
            <div className="terminosubtitle">
              <ContactSection />
            </div>
            <div className="Termsparagraph">
              <div className="contidions">
                <div className="ulli"></div>
              </div>
            </div>

            <div className="Termsparagraph"></div>
          </div>
        </div>
        <Footerlanding />
      </ThemeProvider>
    </Privacidat>
  );
};

const Privacidat = styled.div`
  .Terminosycondiciones {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .headerterms {
    width: 100%;
    display: flex;
    position: fixed;
  }

  .headerterms h1 {
    margin-left: 50px;
    padding: 20px 0;
    filter: grayscale(1);
  }

  .Terminostitle {
    margin-top: 50px;
  }

  .Terminostitle h1 {
    font-size: 50px;
    color: gray;
    font-family: "Poppins", sans-serif;
  }

  .terminosubtitle h2 {
    text-align: start;
    margin-bottom: 40px;
    color: gray;
    font-family: "Poppins", sans-serif;
  }

  .Terminostext {
  }

  .Termsparagraph {
    display: flex;
    width: 800px;
    margin-bottom: 40px;
    font-family: "Poppins", sans-serif;
  }

  .termsnumber {
    padding: 0px 20px;
    text-align: start;
    width: 20%;
  }

  .contidions {
    width: 80%;
    text-align: justify;
  }

  .ulli {
    padding: 10px 10px;
  }

  @media (max-width: 1160px) {
    .headerterms {
      justify-content: end;
    }
    .headerterms h1 {
      margin-left: 0px;
      margin-right: 50px;
    }
  }

  @media (max-width: 900px) {
    .headerterms {
      position: relative;
      justify-content: center;
    }

    .headerterms a h1 {
      margin-right: 0px;
    }
    .Terminostitle {
      margin-top: 0;
    }
    .Terminostitle h1 {
      margin-bottom: 40px;
    }
    .terminosubtitle h2 {
      text-align: center;
    }

    .Termsparagraph {
      flex-direction: column;
      width: 100%;
      padding: 0 30px;
    }

    .termsnumber {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .contidions {
      width: 100%;
    }
  }

  @media (max-width: 400px) {
    .Terminostitle h1 {
      font-size: 30px;
    }
  }
`;

export default Sugerencias;
