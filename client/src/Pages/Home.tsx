import React from "react";
import Navbar from "../components/Navbar";
import SliderContainer from "../components/Home/Slider/SliderContainer";
import Filtros from "../components/Home/Filtros/Filtros";
import Card from "../components/Card"

const Home = () => {
  return (
    <>
      <Navbar />
      <SliderContainer />
      <Filtros />
      <Card></Card>
    </>
  );
};

export default Home;
