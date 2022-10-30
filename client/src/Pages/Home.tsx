import React from "react";
import Navbar from "../components/Navbar";
import SliderContainer from "../components/Home/Slider/SliderContainer";
import Filtros from "../components/Home/Filtros/Filtros";
import Flotantbutton from "../components/Home/button/Flotantbutton"

const Home = () => {
  return (
    <>
      <Navbar />
      <SliderContainer />
      <Filtros />
      <Flotantbutton/>
    </>
  );
};

export default Home;
