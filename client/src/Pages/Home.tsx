import React from "react";
import Navbar from "../components/Navbar";
import SliderContainer from "../components/Home/Slider/SliderContainer";
import Filtros from "../components/Home/Filtros/Filtros";

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
