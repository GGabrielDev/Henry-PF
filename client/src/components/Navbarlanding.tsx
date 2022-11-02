import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import User from "../assets/imagenesSlider/49838.jpg";

const Navbarlanding = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <Navbarlandings>
      <div className="nav-content">
        <div className="logo">
          <Logo>HenryShops</Logo>
        </div>
        <div className="nav__sections-1">
          <a className="section" href={"#home"}>
            Home
          </a>
          <a className="section" href={"#about"}>
            About
          </a>
          <a className="section" href={"#clients"}>
            Clients
          </a>
          <a className="section" href={"#contact"}>
            Contact
          </a>
        </div>

        <div className="nav__sections-2">
          <NavLink className="section button" to="#contact">
            <HiOutlineUserCircle />
          </NavLink>

          <NavLink
            onClick={handleChange}
            className="section button"
            to="#contact"
          >
            <AiOutlineMenu />
          </NavLink>
        </div>

        <div className={menu ? "menu" : "menu menu-dn"}>
          <span className="x" onClick={handleChange}>
            <IoMdClose />
          </span>

          <div className="img__container">
            <div className="img__circle">
              <img src={User} alt="" />
            </div>
            <button className="edit">Editar Perfil</button>
          </div>
          <NavLink className="section-re" to="#home">
            Home
          </NavLink>
          <NavLink className="section-re" to="#about">
            About
          </NavLink>
          <NavLink className="section-re" to="#clients">
            Clients
          </NavLink>
          <NavLink className="section-re" to="#contact">
            Contact
          </NavLink>
        </div>
      </div>
    </Navbarlandings>
  );
};

export default Navbarlanding;

const Navbarlandings = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Bebas+Neue:regular);
  width: 100%;
  height: 30px;
  position: absolute;
  color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;

  .whatsapp {
    width: fit-content;
    position: absolute;
    bottom: 0px;
    right: 0;
  }

  .whatsapp-img {
    cursor: pointer;
    width: 50px;
  }

  .whatsapp-content {
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-content {
    width: 100%;
    max-width: 1400px;
    display: flex;
    justify-content: space-around;
  }

  .logo {
    font-family: "Bebas Neue";
    color: ${({ theme }) => theme.white};
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav__sections-1 {
    height: 100%;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav__sections-2 {
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section {
    color: ${({ theme }) => theme.white};
    padding: 0 10px;
    transition: 0.4s;
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
    &:active {
      color: ${({ theme }) => theme.secondary};
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    position: absolute;
    width: 400px;
    height: 100vh;
    background-color: #ffffff;
    right: 0px;
    top: 0;
    border: 1px solid ${({ theme }) => theme.border};
    transition: 0.6s all ease-in-out;
  }

  .menu-dn {
    position: absolute;
    top: -1000px;
  }

  .img__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 150px;
    }
  }

  .img__circle {
    width: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-bottom: 10px;
  }

  .edit {
    border-radius: 20px;
    padding: 5px 10px;
    border: 1px solid transparent;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      border: 1px solid ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.primary};
    }
  }

  .section-re {
    display: block;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.primary};
    transition: 0.4s;

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  .x {
    padding: 20px;
    cursor: pointer;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  @media screen and (max-width: 700px) {
    .nav__sections-1 {
      display: none;
    }
  }

  @media screen and (max-width: 400px) {
    .menu {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background-color: #ffffff;
      border: 1px solid ${({ theme }) => theme.border};
    }
  }
`;

const Logo = styled.span`
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;
