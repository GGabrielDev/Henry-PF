import React from "react";
import MenuUsuario from "./MenuUsuario";
import styled from "styled-components";

const General = () => {
  return (
    <GeneralContainer>
      <MenuUsuario />
      general
    </GeneralContainer>
  );
};

export default General;

const GeneralContainer = styled.div`
  display: flex;
`;
