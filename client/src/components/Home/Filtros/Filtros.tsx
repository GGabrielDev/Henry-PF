import React from "react";
import styled from "styled-components";
import { Themes } from "../../Theme/Theme";
import {BsFilter,BsSortNumericDown} from "react-icons/bs"

const Filtros = () => {
  return (
    <FiltrosContainer>
      <button className="buttonfilter"><BsFilter/></button>
      <div className="inputcontainerfilet">
        <select name="filtervalor" defaultValue={'DEFAULT'}>
          <option value="DEFAULT"  disabled hidden>All</option>
          <option value="si">Motherboard</option>
          <option value="no">Placa de video</option>
          <option value="no">Monitores</option>
        </select>
      </div>
      <button className="buttonfilter">
        <select name="filtervalor" id="">
          <option value="DEFAULT"  disabled hidden>Sort by:</option>
          <option value="si">Mayor valor</option>
          <option value="no">Menor valor</option>
        </select>
      </button>
    </FiltrosContainer>
  );
};

export default Filtros;

const FiltrosContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;

  .buttonfilter{
    width: 130px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.dark};
    font-size: 30px;
    svg{
      cursor: pointer;
    }

  }

  .inputcontainerfilet{
    display: flex;
    justify-content: center;
    align-items: center;

    select{
      
      margin: 0 10px;
    }
  }

  select{
      background-color:${({ theme }) => theme.tertiary};
      border: 0px;
      outline: none;
      width: 200px;
      height: 30px;
      padding: 0 10px;
      

    }

    @media screen and (max-width: 925px){
      padding: 20px 20px;
      .inputcontainerfilet{
        width: 100%;

        select{
          width: 100%;
        }
      }

      .buttonfilter{
        justify-content: center;
      }
    }

    @media screen and (max-width: 400px){
      .buttonfilter{

        width: 120px;

        select{
          width: 100%;
        }
      }
    }


`;
