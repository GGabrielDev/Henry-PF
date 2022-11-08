import styled from "styled-components";
import Whatsapp from "../assets/imagenesSlider/iconoWTP.png";
const user = [
  {
    nombre: "carlos",
    apellido: "lopez",
  },
];
const carrito = [
  {
    Nombre: "producto 1",
    Monto: 100.0,
  },
  {
    Nombre: "producto 2",
    Monto: 150.0,
  },
  {
    Nombre: "producto 3",
    Monto: 200.0,
  },
];
const numero = "+573053721294";
const WhatsApp = () => {
  let productosParaWsp = carrito.map(
    (producto) => `- ${producto.Nombre}, $${producto.Monto}`
  );
  let datosCliente = user.map(
    (e: any) => `-Nombre: ${e.nombre} \n -Apellido: ${e.apellido}`
  );
  const productosConFormatoAmigable = productosParaWsp.join("\n");
  return (
    <WhatsAppContainer>
      <a
        className="whatsapp"
        href={`https://api.whatsapp.com/send?phone=${numero}&text=Hola+%F0%9F%91%8B.%0D%0AMe+gustar%C3%ADa+saber+mas+acerca+de++%F0%9F%96%A5Henry+shops+y+de+su+propuesta+de+valor.
         
          `}
      >
        <div className="whatsapp-content">
          <img className="whatsapp-img" src={Whatsapp} alt="" />
        </div>
      </a>
    </WhatsAppContainer>
  );
};

export default WhatsApp;

const WhatsAppContainer = styled.div`
  width: fit-content;
  position: fixed;
  bottom: 0px;
  right: 0;
  z-index: 1;

  .whatsapp {
    width: 100%;
    cursor: default;
  }

  .whatsapp-img {
    width: 50px;
    cursor: pointer;
  }

  .whatsapp-content {
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }

  @media screen and (max-width: 700px) {
    .whatsapp-img {
      cursor: pointer;
      width: 30px;
    }
  }
`;
