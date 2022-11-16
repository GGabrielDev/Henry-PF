import React from "react";
import styled from "styled-components";
import {
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineForm,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectors, UserType } from "../../features/users/userSlice";
import { useAuth0 } from "@auth0/auth0-react";

const { selectUser } = selectors;

const MenuUsuario = () => {
  const usuario = useAppSelector(selectUser) as UserType;
  const { isAuthenticated, user } = useAuth0();
  return (
    <ThemeProvider theme={ThemesLanding}>
      <MenuUsuarioContainer>
        <MenuUsuarioContent>
          <NavLink to="/">
            <div className="menu__back">
              <AiOutlineArrowLeft className="user__icon-arrow" /> Volver
            </div>
          </NavLink>

          <div className="menu__title">
            Personal <AiOutlineUser className="user__icon " />
          </div>

          <div className="menu__sections">
            <NavLink to="/usuario/general" className="menu__sections-name">
              <span>General</span>
            </NavLink>
          </div>
          {isAuthenticated && usuario.sellerId ? (
            <>
              <div className="menu__title">
                Vendedor <AiOutlineForm className="user__icon " />
              </div>
              <div className="menu__sections">
                <NavLink
                  to="/usuario/editar/producto"
                  className="menu__sections-name"
                >
                  <span>Mis Productos</span>
                </NavLink>
                <NavLink
                  to="/usuario/sellerGeneral"
                  className="menu__sections-name"
                >
                  <span>Mi Tienda</span>
                </NavLink>
              </div>
            </>
          ) : (
            <></>
          )}
          {isAuthenticated && user?.email === "lieutenet.85@gmail.com" ? (
            <>
              <div className="menu__title">
                Henry Admin <AiOutlineForm className="user__icon " />
              </div>
              <div className="menu__sections">
                <NavLink to="/usuario/usuarios" className="menu__sections-name">
                  <span>Usuarios</span>
                </NavLink>
              </div>
              <div className="menu__sections">
                <NavLink to="/usuario/tiendas" className="menu__sections-name">
                  <span>Tiendas</span>
                </NavLink>
              </div>
            </>
          ) : null}

          {/* <NavLink to="/usuario/editar" className="menu__sections-name">
            <span>Mecador Pago</span>
            </NavLink>
            <NavLink to="/usuario/editar" className="menu__sections-name">
            <span className="name__ultimate">Editar Métodos</span>
          </NavLink> */}
        </MenuUsuarioContent>
      </MenuUsuarioContainer>
    </ThemeProvider>
  );
};

export default MenuUsuario;

const MenuUsuarioContainer = styled.div`
  width: 250px;
  height: 100%;
  .icon_user {
    margin: 0 5px;
  }
  Link {
    text-decoration: none;
  }

  @media screen and (max-width: 576px) {
    width: 150px;
  }
`;

const MenuUsuarioContent = styled.div`
  padding: 20px;
  .menu__back {
    display: flex;
    align-items: center;
    justify-content: start;
    color: ${({ theme }) => theme.dark};
  }

  .user__icon-arrow {
    margin-right: 5px;
  }
  .menu__title {
    font-size: 15px;
    color: ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 5px;
    margin-top: 10px;
  }

  .user__icon {
    margin-left: 5px;
  }

  .menu__sections-name {
    margin-bottom: 5px;
    padding: 5px 20px;
    color: ${({ theme }) => theme.dark};
    display: block;
    font-size: 11px;
    transition: 0.5s;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      background-color: ${({ theme }) => theme.light};
    }
    &.active {
      background-color: ${({ theme }) => theme.tertiary};
    }
  }

  .name__ultimate {
    margin-bottom: 0px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    .menu__title {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 576px) {
    padding: 5px;
    .menu__title {
      font-size: 11px;
    }
    .menu__sections-name {
      padding: 0;
    }
  }
`;
