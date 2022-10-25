import React from "react";
import styled from "styled-components";
import { Themes } from "./Theme/Theme";

const Navbar = () => {
  return <NavbarContainer>Navbar</NavbarContainer>;
};

export default Navbar;

const NavbarContainer = styled.div`
  color: ${Themes.primary};
`;
