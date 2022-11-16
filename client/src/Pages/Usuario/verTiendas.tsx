import MenuUsuario from "./MenuUsuario";
import styled, { useTheme } from "styled-components";
import Perfil from "../../assets/imagenesSlider/profile.png";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import { actions, selectors, UserType } from "../../features/users/userSlice";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";

const { selectUser } = selectors;

const General = () => {
  const user = useAppSelector(selectUser) as UserType;

  return (
    <GeneralContainer>
      <ThemeProvider theme={ThemesLanding}>
        <MenuUsuario />
        <GeneralContent>
          <h1 className="general__perfil-title">Tiendas de Henry Shops</h1>
          <div className="users__container">
            <div className="user__data">Nombre</div>
            <div className="user__data">Propietario</div>
            <div className="user__data">Email</div>
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
`;

const GeneralContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 100px;
  border-left: 1px solid rgb(0, 0, 0, 0.1);

  .general__perfil-title {
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
    text-align: center;
    margin-bottom: 10px;
  }

  .users__container {
    width: 100%;
    display: flex;
  }

  .user__data {
    width: 100px;
    font-size: 15px;
    padding: 10px 5px;
    text-align: start;
    border: 1px solid ${({ theme }) => theme.border};
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
