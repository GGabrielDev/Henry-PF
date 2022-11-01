import React from "react";
import styled, { ThemeContext } from "styled-components";
import Navbar from "../Tugamer/Navbar";

const Error404 = () => {
  return (
    <>
      <Navbar />
      <ErrorContainer>
        <Error>Error 404</Error>
        <ErrorTecto>La pagína que buscas no esta disponible</ErrorTecto>
      </ErrorContainer>
    </>
  );
};

export default Error404;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Error = styled.h1`
  color: ${({ theme }) => theme.error};
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
