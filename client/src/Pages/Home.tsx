import React from "react";
import Navbar from "../components/Navbar";
import SliderContainer from "../components/Slider/SliderContainer";
import Filtros from "../components/Filtros/Filtros";

const Home = () => {
  return (
    <>
      <Navbar />
      <SliderContainer />
      <Filtros />
    </>
  );
};

export default Home;
