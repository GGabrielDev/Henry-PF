import Navbar from "../../components/TuHamburguesa/Navbar";
import SliderContainer from "../../components/TuHamburguesa/Home/Slider/SliderContainer";
import Filtros from "../../components/TuHamburguesa/Home/Filtros/Filtros";
import Flotantbutton from "../../components/TuHamburguesa/Home/button/Flotantbutton";
import Cards from "../../components/TuHamburguesa/Cards";
import { ThemeProvider } from "styled-components";
import { Themes } from "../../components/TuHamburguesa/Theme/Theme";

const TuHamburguesa = () => {
  return (
    <>
      <ThemeProvider theme={Themes}>
        <Navbar />
        <SliderContainer />
        <Filtros />
        <Cards />
        <div>
          <Flotantbutton />
        </div>
      </ThemeProvider>
    </>
  );
};

export default TuHamburguesa;
