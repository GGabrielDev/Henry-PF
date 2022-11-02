import styled from "styled-components";
import Whatsapp from "../assets/imagenesSlider/iconoWTP.png";

const WhatsApp = () => {
  return (
    <WhatsAppContainer>
      <div className="whatsapp-content">
        <img className="whatsapp-img" src={Whatsapp} alt="" />
      </div>
    </WhatsAppContainer>
  );
};

export default WhatsApp;

const WhatsAppContainer = styled.div`
  width: fit-content;
  position: fixed;
  bottom: 0px;
  right: 0;

  .whatsapp-img {
    cursor: pointer;
    width: 50px;
  }

  .whatsapp-content {
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  @media screen and (max-width: 700px) {
    .whatsapp-img {
      cursor: pointer;
      width: 30px;
    }
  }
`;
