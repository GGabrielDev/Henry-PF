import React from "react";
import MenuUsuario from "./MenuUsuario";
import styled from "styled-components";
import Imagen from "../../assets/imagenesSlider/luis perfumes.jpg";
import Imagen2 from "../../assets/imagenesSlider/5fa8fb32d99eb.jpeg";
import Imagen3 from "../../assets/imagenesSlider/hamburguesas.jpg";
import { MdFavorite } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";

const General = () => {
  return (
    <GeneralContainer>
      <MenuUsuario />
      <ThemeProvider theme={ThemesLanding}>
        <GeneralContent>
          <h1 className="general__perfil-title">Tus Productos Favoritos</h1>
          <div className="compra__card">
            <div className="img__compra__compra-container">
              <img className="img__compra__compra" src={Imagen} alt="" />
            </div>
            <div className="compra__card__info">
              <p className="compra__card__title">Luis Perfumes</p>

              <p className="compra__card__info3">Perfume Antonio Banderas</p>
            </div>
            <div className="delete__container">
              <a className="comprar">Comprar</a>
              <h3 className="det_del">
                <AiOutlineClose />
              </h3>
            </div>
          </div>

          <div className="compra__card">
            <div className="img__compra__compra-container">
              <img className="img__compra__compra" src={Imagen2} alt="" />
            </div>
            <div className="compra__card__info">
              <p className="compra__card__title">Jose Zapateria</p>
              <p className="compra__card__info3">
                Zapatillas replicas Nike Jordan
              </p>
            </div>
            <div className="delete__container">
              <a className="comprar">Comprar</a>
              <h3 className="det_del">
                <AiOutlineClose />
              </h3>
            </div>
          </div>

          <div className="compra__card">
            <div className="img__compra__compra-container">
              <img className="img__compra__compra" src={Imagen3} alt="" />
            </div>
            <div className="compra__card__info">
              <p className="compra__card__title">Andrés Hamburguesas</p>
              <p className="compra__card__info3">
                Hamburguesa colombiana con extra queso
              </p>
            </div>
            <div className="delete__container">
              <a className="comprar">Comprar</a>
              <h3 className="det_del">
                <AiOutlineClose />
              </h3>
            </div>
          </div>
        </GeneralContent>
      </ThemeProvider>
    </GeneralContainer>
  );
};

export default General;

const GeneralContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

const GeneralContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  border-left: 1px solid ${({ theme }) => theme.border};

  .general__perfil-title {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .compra__card {
    width: 100%;
    background-color: ${({ theme }) => theme.cream2};
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    border: 1px solid ${({ theme }) => theme.border};
  }

  .img__compra__compra-container {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    .img__compra__compra {
      width: 100%;
    }
  }

  .compra__card__info {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 200px;
  }

  .compra__card__title {
    color: ${({ theme }) => theme.primary};
  }

  .compra__card__info2 {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .compra__card__info3 {
    text-align: center;
    font-size: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  .compra__card__info4 {
    font-size: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    padding: 2px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    transition: 0.5s;
    &:hover {
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }
  }

  .delete__container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100px;
    h3 {
      padding: 5px;
      cursor: pointer;
      color: ${({ theme }) => theme.tertiary};
      transition: 0.4s;
      &:hover {
        color: ${({ theme }) => theme.error};
      }
    }
    transition: 0.5s;
  }

  .comprar {
    font-size: 12px;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 576px) {
    padding: 5px 5px;

    .general__perfil-title {
      text-align: center;
    }

    .compra__card {
      flex-direction: column;
      text-align: center;
    }

    .img__compra__compra-container {
      width: 100%;
      .img__compra__compra {
        width: 50%;
      }
    }
  }
`;
