import React from "react";
import Navbar from "../../components/Tugamer/Navbar";
import SliderContainer from "../../components/Tugamer/Home/Slider/SliderContainer";
import Filtros from "../../components/Tugamer/Home/Filtros/Filtros";
import Flotantbutton from "../../components/Tugamer/Home/button/Flotantbutton";
import Cards from "../../components/Tugamer/Cards";

const Tugamer = () => {
  return (
    <>
      <Navbar />
      <SliderContainer />
      <Filtros />

      <Cards />

      <div>
        <Flotantbutton />
      </div>
    </>
  );
};

export default Tugamer;
