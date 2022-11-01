import styled from "styled-components";
import Whatsapp from "../assets/imagenesSlider/iconoWTP.png";
import { useState } from "react";

const WhatsApp = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };
  return (
    <WhatsAppContainer>
      <img src={Whatsapp} alt="" />
      <div className=""></div>
    </WhatsAppContainer>
  );
};

export default WhatsApp;

const WhatsAppContainer = styled.div`
  width: 100px;
`;
