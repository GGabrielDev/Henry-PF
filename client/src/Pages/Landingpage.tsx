import React from 'react'
import Header from "../assets/SVG/Recurso 2.svg"
import styled from "styled-components";
import Navbarlanding from '../components/Navbarlanding';

const Landingpage = () => {
  return (
    <Landingpages>
      <Navbarlanding/>

      <div className="headersection">
      <img className='imgtopheader' src={Header} alt="" /> 

      </div>
    </Landingpages>
  )
}

const Landingpages = styled.div`
  width: 100%;
  .headersection{
    width: 100%;
  }

  .navbarheader{
    width: 100%;
    height: 75px;
    z-index: 100;

  }

  
  .imgtopheader{
    position: absolute;
    top: -7px;
    right: 0;
    width: 55vw;

    z-index: -1;
  }


`

export default Landingpage