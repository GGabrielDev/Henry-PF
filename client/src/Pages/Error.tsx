import React from "react";
import styled from "styled-components";
import Navbarlanding from "../components/Navbarlanding";
import { ThemesLanding } from "../components/ThemesLanding";
import { ThemeProvider } from "styled-components";

const Error404 = () => {
  return (
    <Container>
      <ThemeProvider theme={ThemesLanding}>
        <Navbarlanding />
        <ErrorContainer>
          <Error>Error 404</Error>
          <ErrorTecto>La pagína que buscas no esta disponible</ErrorTecto>
        </ErrorContainer>
      </ThemeProvider>
    </Container>
  );
};

export default Error404;

const Container = styled.div``;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Error = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
  @media screen and (max-width: 350px) {
    font-size: 15px;
  }
`;

const ErrorTecto = styled.h4`
  color: ${({ theme }) => theme.dark};
  font-size: 14px;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 350px) {
    font-size: 12px;
  }
`;
