import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineMenu, AiFillSetting } from "react-icons/ai";
import { useState } from "react";
import { IoMdClose, IoIosArrowForward } from "react-icons/io";
import UserDefault from "../assets/imagenesSlider/defaultuser.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemesLanding } from "./ThemesLanding";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectors, UserType } from "../features/users/userSlice";

const { selectUser } = selectors;

const Navbarlanding = () => {
  const [menu, setMenu] = useState(false);
  const { user, logout, isAuthenticated, loginWithRedirect } = useAuth0();
  const usuario = useAppSelector(selectUser) as UserType;

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <>
      <ThemeProvider theme={ThemesLanding}>
        <Navbarlandings>
          <div className="nav-content">
            <Link to="/">
              <div className="logo">
                <Logo>HenryShops</Logo>
              </div>
            </Link>
            <div className="nav__sections-1">
              <Link to="/" className="section">
                Home
              </Link>
              <Link to="/" className="section">
                About
              </Link>
              <Link to="/" className="section">
                Clients
              </Link>
              <Link to="/" className="section">
                Plans
              </Link>
              <Link to="/" className="section">
                Contact
              </Link>
            </div>

            <div className="nav__sections-2">
              {isAuthenticated ? (
                <NavLink className="section button" to="/usuario">
                  <HiOutlineUserCircle />
                </NavLink>
              ) : (
                <NavLink className="section button" to="">
                  <HiOutlineUserCircle onClick={() => loginWithRedirect()} />
                </NavLink>
              )}

              <span
                onClick={handleChange}
                className={`${menu ? "dn-menu" : "section button"} `}
              >
                <AiOutlineMenu />
              </span>
            </div>

            <div className={menu ? "menu" : "menu menu-dn"}>
              <span className="x">
                <p>
                  <IoMdClose onClick={handleChange} />
                </p>
              </span>

              <div className="img__container">
                <div className="img__circle">
                  {usuario.imagenDePerfil ? (
                    <img
                      referrerPolicy="no-referrer"
                      src={usuario.imagenDePerfil}
                      alt="picture"
                    />
                  ) : (
                    <img src={UserDefault} alt="" />
                  )}
                </div>
              </div>

              {usuario.firstName ? (
                <>
                  <div className="section-re">
                    <div className="section__cajita2">
                      <span className="section__name">
                        {usuario.firstName + " " + usuario.lastName}
                      </span>
                      <span className="icon-re"></span>
                    </div>
                  </div>

                  <NavLink className="section-re" to="/usuario">
                    <div className="section__cajita">
                      <span className="section__name">Tu Perfil</span>
                      <span className="icon-re">
                        <IoIosArrowForward />
                      </span>
                    </div>
                  </NavLink>
                  <NavLink className="section-re" to="#home">
                    <div className="section__cajita">
                      <span onClick={() => logout()} className="section__name">
                        Logout
                      </span>
                      <span className="icon-re">
                        <IoIosArrowForward />
                      </span>
                    </div>
                  </NavLink>
                </>
              ) : (
                <NavLink className="section-re" to="#home">
                  <div className="section__cajita">
                    <span
                      className="section__name"
                      onClick={() => loginWithRedirect()}
                    >
                      Login
                    </span>
                    <span className="icon-re">
                      <IoIosArrowForward />
                    </span>
                  </div>
                </NavLink>
              )}

              <div className="flex">
                <div className="cajita__section__page">
                  <Link to="/" className="section__page">
                    Home
                  </Link>
                  <span className="icon-re">
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>

              <div className="flex">
                <div className="cajita__section__page">
                  <Link to="/" className="section__page">
                    About
                  </Link>
                  <span className="icon-re">
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>

              <div className="flex">
                <div className="cajita__section__page">
                  <Link to="/" className="section__page">
                    Clients
                  </Link>
                  <span className="icon-re">
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>
              <div className="flex">
                <div className="cajita__section__page">
                  <Link to="/" className="section__page">
                    Plans
                  </Link>
                  <span className="icon-re">
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>

              <div className="flex">
                <div className="cajita__section__page">
                  <a className="section__page" href={"#contact"}>
                    Contact
                  </a>
                  <span className="icon-re">
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Navbarlandings>
      </ThemeProvider>
    </>
  );
};

export default Navbarlanding;

const Navbarlandings = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Bebas+Neue:regular);
  width: 100%;
  height: 30px;
  position: absolute;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;

  .whatsapp {
    width: fit-content;
    position: absolute;
    bottom: 0px;
    right: 0;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dn-menu {
    visibility: hidden;
  }

  .section {
    color: ${({ theme }) => theme.white};
    padding: 0 10px;
    transition: 0.4s;
    cursor: pointer;
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
    position: fixed;
    width: 400px;
    min-height: 100vh;
    background-color: #ffffff;
    right: 0px;
    top: 0;
    border: 1px solid ${({ theme }) => theme.border};
    transition: 0.6s all ease-in-out;
  }

  .menu-dn {
    position: absolute;
    top: -5000px;
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

  .x {
    padding: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: end;
    p {
      cursor: pointer;
    }
  }

  .edit {
    border-radius: 20px;
    padding: 5px 10px;
    border: 1px solid transparent;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    cursor: pointer;
    transition: 0.4s;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.primary};
    }
  }

  .section-re {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .section__name {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .section__page {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .cajita__section__page {
    color: ${({ theme }) => theme.black};
    a {
      color: ${({ theme }) => theme.black};
    }
    display: flex;
    justify-content: center;
    transition: 0.4s;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    width: 200px;
    display: flex;
    justify-content: center;
    display: none;
    &:hover {
      background-color: #005eff4e;
      color: ${({ theme }) => theme.primary};
    }
  }

  .section__cajita {
    color: ${({ theme }) => theme.black};
    transition: 0.4s;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    width: 200px;
    display: flex;
    justify-content: center;
    &:hover {
      background-color: #005eff4e;
      color: ${({ theme }) => theme.primary};
    }
  }
  .section__cajita2 {
    color: ${({ theme }) => theme.dark};
    transition: 0.4s;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    width: 200px;
    display: flex;
    justify-content: center;
  }

  .icon-re {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
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

  AiFillSetting {
    outline: none;
    color: red;
  }

  @media screen and (max-width: 700px) {
    .nav__sections-1 {
      display: none;
    }
    .cajita__section__page {
      display: flex;
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
