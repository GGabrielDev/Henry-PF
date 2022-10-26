import React from "react";
import styled from "styled-components";
import { Themes } from "../Theme/Theme";

const Filtros = () => {
  return (
    <FiltrosContainer>
      <div className="filtro__name active">Hot</div>
      <div className="filtro__name">Mas bajo</div>
      <div className="filtro__name">Mas alto</div>
      <div className="filtro__name">Hombre</div>
      <div className="filtro__name">Mujer</div>
    </FiltrosContainer>
  );
};

export default Filtros;

const FiltrosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  .filtro__name {
    padding: 5px 5px;
    margin: 0 15px;
    border: 1px solid ${Themes.secondary};
    border-radius: 5px;
    margin-top: 10px;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      background-color: ${Themes.primary};
    }
  }
  .active {
    background-color: ${Themes.primary};
  }
`;
