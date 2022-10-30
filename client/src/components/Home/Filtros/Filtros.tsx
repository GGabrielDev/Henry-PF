import React, {ChangeEvent} from "react";
import styled from "styled-components";
import { Themes } from "../../Theme/Theme";
import {BsFilter,BsSortNumericDown} from "react-icons/bs"
import { useAppDispatch } from "../../../app/hooks";
import { filtroPrecio } from "../../../redux/actions";

const Filtros = () => {
  const dispatch = useAppDispatch();
  const handleAsc = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
    dispatch(filtroPrecio(e.target.value))
  }
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
        <select onChange={(e)=>handleAsc(e)} name="filtervalor" id="">
          <option value="all"  disabled hidden>Sort by:</option>
          <option value="des">Mayor valor</option>
          <option value="asc">Menor valor</option>
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
