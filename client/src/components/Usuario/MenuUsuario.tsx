import React from "react";
import styled from "styled-components";
import {
  AiFillCreditCard,
  AiOutlineUser,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const MenuUsuario = () => {
  return (
    <MenuUsuarioContainer>
      <MenuUsuarioContent>
        <Link to="/">
          <div className="menu__back">
            <AiOutlineArrowLeft className="user__icon-arrow" /> Volver
          </div>
        </Link>

        <Link to="/"></Link>

        <div className="menu__title">
          Personal <AiOutlineUser className="user__icon " />
        </div>

        <div className="menu__sections">
          <Link to="/general">
            <span className="menu__sections-name active">General</span>
          </Link>
          <Link to="/compras">
            <span className="menu__sections-name">Compras</span>
          </Link>
          <Link to="/favoritos">
            <span className="menu__sections-name">Favoritos</span>
          </Link>
          <Link to="/editar">
            <span className="menu__sections-name name__ultimate">
              Editar perfil
            </span>
          </Link>
        </div>

        <div className="menu__title">
          Medios de pago <AiFillCreditCard className="user__icon " />
        </div>

        <div className="menu__sections">
          <span className="menu__sections-name">Tarjeta</span>
          <span className="menu__sections-name">Mecador Pago</span>
          <span className="menu__sections-name name__ultimate">
            Editar Métodos
          </span>
        </div>
      </MenuUsuarioContent>
    </MenuUsuarioContainer>
  );
};

export default MenuUsuario;

const MenuUsuarioContainer = styled.div`
  width: 250px;
  height: 100%;
  border-right: 1px solid rgb(0, 0, 0, 0.1);
  .icon_user {
    margin: 0 5px;
  }
  Link {
    text-decoration: none;
  }
`;

const MenuUsuarioContent = styled.div`
  padding: 20px;
  .menu__back {
    display: flex;
    align-items: center;
    justify-content: start;
    color: black;
  }

  .user__icon-arrow {
    margin-right: 5px;
  }
  .menu__title {
    font-size: bold;
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
    color: ${({ theme }) => theme.black};
    display: block;
    font-size: 11px;
    transition: 0.5s;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      background-color: #f7f7f7;
    }
    &.active {
      background-color: #f7f7f7;
    }
  }

  .name__ultimate {
    margin-bottom: 0px;
  }
`;
