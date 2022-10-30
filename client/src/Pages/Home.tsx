import React from "react";
import Navbar from "../components/Navbar";
import SliderContainer from "../components/Home/Slider/SliderContainer";
import Filtros from "../components/Home/Filtros/Filtros";
import Flotantbutton from "../components/Home/button/Flotantbutton"
import Cards from "../components/Cards/Cards";
import styled from "styled-components";
const Home = () => {
  return (
    <>
      <Navbar />
      <SliderContainer />
      <Filtros />
      <DivHome>
      <div><Cards /></div>
      
      </DivHome>
      <div><Flotantbutton/></div>
    </>
  );
};

export default Home;

const DivHome = styled.div`
  
  margin: 30px 100px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: auto;
  grid-column: 1/3;
  grid-row: 1/4;
  height: auto;
  align-content: center;
  justify-content: center;
  align-items: center;
`
