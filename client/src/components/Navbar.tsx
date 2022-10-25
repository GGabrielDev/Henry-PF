import React from "react";
import styled from "styled-components";
import { Themes } from "./Theme/Theme";

const Navbar = () => {
  return (
    <NavbarContainer>
      <div className="content">
        <span className="nav__logo">Tu Negocio.</span>
        <div className="nav__searchbar"></div>
        <div className="nav__user"></div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  width: 100%;

  .content {
    font-family: Poppins;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${Themes.primary};
    height: 50px;
  }

  .nav__logo {
    color: ${Themes.secondary};
  }
`;
