import React from "react";
import Header from "../assets/fondo.svg";
import Phone from "../assets/phone.svg";
import Store from "../assets/store.png";
import styled from "styled-components";
import Navbarlanding from "../components/Navbarlanding";
import Footerlanding from "../components/Footerlanding";
import { Link } from "react-router-dom";
import { ThemesLanding } from "../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import WhatsApp from "../components/WhatsApp";
import ContactContainer from "../components/Contact";
import Ourclients from "../components/Clientes/Ourclients";
import Subcription from "../components/subcription";

const Landingpage = () => {
  return (
    <Landingpages>
      <ThemeProvider theme={ThemesLanding}>
        <Navbarlanding />
        <WhatsApp />
        <div className="headersection">
          {/* <img className='imgtopheader' src={Header} alt="" />  */}
          <div className="containerheader">
            <div className="titleheader">
              <h1>
                La mejor opcion para crear tu tienda online por{" "}
                <span> WhatsApp </span>
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
                repellat labore accusantium delectus.
              </p>
              <button>Empezar</button>
            </div>
            <div className="imgheader">
              <img src={Store} alt="" />
            </div>
          </div>
        </div>
        <div className="middlesection">
          {/* <h1>Explore</h1> */}
          <div className="aboutinfo">
            <div className="img-info">
              <img src={Phone} alt="" />
            </div>
            <div id="home" className="text-info">
              <h1>Vende tus productos</h1>
              <h2>¡La forma mas sencilla de llegar a tus clientes.!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                incidunt vero dolore laudantium, sapiente ipsam accusantium,
                dignissimos, perspiciatis veniam odit fugiat voluptas esse
                tempora cupiditate minus neque adipisci! Fuga doloribus,
                assumenda delectus numquam totam optio, quibusdam, fugiat
                consequatur dolore exercitationem similique! Distinctio
                doloremque et esse optio, saepe quidem sunt non!
              </p>
              <div className="buttoninfo">
                <Link to={"/"}>
                  <button>Obtener</button>
                </Link>
              </div>
            </div>
          </div>

          <h1 id="clients">Nuestros Clientes </h1>

          <Ourclients />

          <h1 id="plans"> Plans </h1>
          <p>FlexiblePlns</p>
          <Subcription />

          <h1 id="contact">Contactanos</h1>

          <ContactContainer />
        </div>

        <Footerlanding />
      </ThemeProvider>
    </Landingpages>
  );
};

const Landingpages = styled.div`
  width: 100%;

  .headersection {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${Header});
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 30px;
    /* background-position: 100px; */
  }

  .containerheader {
    display: flex;
    width: 100%;
    padding: 0px 40px 40px 40px;

    max-width: 1200px;
    align-items: center;
    justify-content: space-between;
  }

  .titleheader {
    width: 450px;
    font-size: 20px;
    color: white;
    h1 {
      font-weight: 600;
    }
    span {
      color: #6cffba;
    }

    p {
      font-size: 15px;
    }
    button {
      width: 150px;
      height: 40px;
      border: none;
      background-color: #005cff;
      color: white;
      border-radius: 7px;
      cursor: pointer;
      transition: 0.2s;
      margin-bottom: 30px;
    }
  }

  .imgheader {
    width: 600px;
    display: flex;

    img {
      width: 100%;
    }
  }

  .navbarheader {
    width: 100%;
    height: 75px;
    z-index: 100;
  }

  .imgtopheader {
    top: -7px;
    right: 0;
    width: 55vw;

    z-index: -1;
  }

  .middlesection {
    width: 100%;
    text-align: center;
    color: #005cff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 60px;
    }
  }

  .aboutinfo {
    width: 100%;
    padding: 40px 40px 0px 40px;
    margin-bottom: 40px;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
  }

  .img-info {
    width: 300px;
    display: flex;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }
  .text-info {
    width: 700px;
    text-align: start;
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    h1 {
      font-size: 60px;
      line-height: 80px;
    }
    h2 {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 30px;
    }

    .buttoninfo {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    button {
      width: 150px;
      height: 40px;
      border: none;
      background-color: #005cff;
      color: white;
      border-radius: 7px;
      cursor: pointer;
      transition: 0.2s;
      margin-bottom: 30px;
    }

    button:hover {
      background-color: #0048c4;
    }
  }

  @media screen and (min-width: 1666px) {
    .headersection {
      height: 650px;
    }
  }

  @media screen and (min-width: 1400px) {
    .containerheader {
      max-width: 1400px;
    }

    .aboutinfo {
      max-width: 1400px;
    }
  }

  @media screen and (max-width: 1150px) {
    .aboutinfo {
      flex-direction: column-reverse;
      align-items: center;
    }

    .text-info {
      text-align: center;
    }
  }

  @media screen and (max-width: 900px) {
    .aboutinfo {
      padding: 0;
    }

    .middlesection {
      h1 {
        font-size: 30px;
      }
    }

    .text-info {
      width: 100%;
      padding: 10px;

      h1 {
        font-size: 30px;
        line-height: 60px;
      }

      h2 {
        font-size: 15px;
      }
    }
    .imgheader {
      display: none;
    }

    .headersection {
      height: 400px;
    }

    .containerheader {
      justify-content: center;
    }

    .titleheader {
      text-align: center;
    }
  }

  @media screen and (max-width: 480px) {
    .containerheader {
      padding: 0 20px;
    }

    .titleheader {
      h1 {
        font-size: 25px;
      }

      p {
        font-size: 10px;
      }
    }
  }
`;

export default Landingpage;
