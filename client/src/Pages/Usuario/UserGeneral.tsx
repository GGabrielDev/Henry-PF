import React from "react";
import MenuUsuario from "./MenuUsuario";
import styled, { useTheme } from "styled-components";
import Perfil from "../../assets/imagenesSlider/profile.png";
import UserDefault from "../../assets/imagenesSlider/defaultuser.jpg";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const General = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <GeneralContainer>
      <ThemeProvider theme={ThemesLanding}>
        <MenuUsuario />
        <GeneralContent>
          <h1 className="general__perfil-title">Tu Pefil</h1>
          <div className="general__info">
            <h3 className="general__perfil-section">Tu Foto</h3>
            <div className="general__img">
              <div className="img__container">
                {isAuthenticated ? (
                  <img src={user?.picture} alt="picture" />
                ) : (
                  <img src={UserDefault} alt="" />
                )}
              </div>
              <div className="botones">
                <button className="subir__img">Subir Foto </button>
                <button className="borrar__img">Borrar Foto</button>
              </div>
            </div>
            <h2 className="general__perfil-section">Información básica:</h2>

            <h3 className="general__perfil-section-item">Nombre/s</h3>
            <p className="general__input">{user?.given_name}</p>

            <h3 className="general__perfil-section-item">Apellido/s</h3>
            <p className="general__input">{user?.family_name}</p>

            <h3 className="general__perfil-section-item">Email</h3>
            <p className="general__input">{user?.email}</p>
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
  padding: 20px 100px;
  border-left: 1px solid rgb(0, 0, 0, 0.1);

  .general__perfil-title {
    font-size: 20px;
  }

  .general__img {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 10px;
    width: 300px;
    height: fit-content;
  }

  .img__container {
    background-color: ${({ theme }) => theme.border};
    width: 150px;
    height: 150px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .botones {
    height: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 20px;
  }

  .subir__img {
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }
  }

  .borrar__img {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.border};
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }
  }

  .general__perfil-section {
    font-size: 14px;
    font-weight: 400px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .general__perfil-section-item {
    font-size: 12px;
    color: ${({ theme }) => theme.details};
    margin-top: 5px;
  }

  .general__input {
    padding: 5px 0;
    border-radius: 10px;
    width: 50%;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
  }

  @media screen and (max-width: 768px) {
    padding: 10px 10px;
    height: auto;
    .general__input {
      width: 100%;
    }
  }

  @media screen and (max-width: 576px) {
    .general__img {
      flex-direction: column;
      width: 100%;
    }
    .general__perfil-title {
      text-align: center;
    }
    .general__perfil-section {
      text-align: center;
    }
  }
`;
