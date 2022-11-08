import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Themes } from "../../Theme/Theme";
import { BsFilter, BsSortNumericDown } from "react-icons/bs";
import { useAppDispatch } from "../../../../app/hooks";

import {
  filterAsc,
  searchProduct,
} from "../../../../features/products/productSlice";
import { Link } from "react-router-dom";

const Filtros = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const handleAsc = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    dispatch(filterAsc(e.target.value));
  };
  const handleInputChange = function (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    e.preventDefault();
    setSearch(e.target.value);
    if (search) {
      dispatch(searchProduct(search));
    }
  };
  return (
    <FiltrosContainer>
      <Link to="publicar">
        <button className="buttonfilter">Agregar producto</button>
      </Link>
      <div className="inputcontainerfilet">
        <input
          placeholder="Productos"
          type="text"
          name="name"
          value={search}
          className="search"
          onChange={handleInputChange}
        />
      </div>
      <button className="button__select">
        <select onChange={(e) => handleAsc(e)} name="filtervalor" id="">
          <option value="all" disabled hidden>
            Sort by:
          </option>
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
  .button__select {
    width: 130px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.dark};
    font-size: 30px;
    svg {
      cursor: pointer;
    }
  }

  .buttonfilter {
    background-color: ${({ theme }) => theme.primary};
    font-size: 15px;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.light};
    padding: 5px;
    border-radius: 5px;
    transition: 0.4s;
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }

  .inputcontainerfilet {
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      margin: 0 10px;
    }
  }

  select {
    background-color: ${({ theme }) => theme.tertiary};
    border: 0px;
    outline: none;
    width: 200px;
    height: 30px;
    padding: 0 10px;
  }

  @media screen and (max-width: 925px) {
    padding: 20px 20px;
    .inputcontainerfilet {
      width: 100%;

      select {
        width: 100%;
      }
    }

    .buttonfilter {
      justify-content: center;
    }
  }

  @media screen and (max-width: 400px) {
    .buttonfilter {
      width: 120px;

      select {
        width: 100%;
      }
    }
  }
`;
