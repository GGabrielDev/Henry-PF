import React from "react";
import styled from "styled-components";

const Navbarlanding = () => {
  return <Navbarlandings>Nav</Navbarlandings>;
};

export default Navbarlanding;

const Navbarlandings = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.white};
`;
