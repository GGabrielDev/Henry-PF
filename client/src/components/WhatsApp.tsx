import styled from "styled-components";
import Whatsapp from "../assets/imagenesSlider/iconoWTP.png";
const user=[{
  nombre:'carlos',
  apellido:'lopez',
  
}]
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
const numero='+573053721294'
const WhatsApp = () => {
  
  let productosParaWsp = carrito.map(
    (producto) => `- ${producto.Nombre}, $${producto.Monto}`
  );
  let datosCliente = user.map((e:any) => `-Nombre: ${e.nombre} \n -Apellido: ${e.apellido}`)
  const productosConFormatoAmigable = productosParaWsp.join("\n");
  return (
    <a
        href={
          `https://api.whatsapp.com/send?phone=${numero}&text=Hola%E2%98%BA%0D%0A%F0%9F%93%82Mis+datos+son%3A%0D%0A${datosCliente}%0D%0AEstoy+interesado+en+los+siguientes+productos+de+la+pagina%F0%9F%94%A5%3A` +
          " " + 
          productosConFormatoAmigable
        }
      >
    <WhatsAppContainer>
      <div className="whatsapp-content">
        <img className="whatsapp-img" src={Whatsapp} alt="" />

      </div>
    </WhatsAppContainer>
    </a>
  );
};

export default WhatsApp;

const WhatsAppContainer = styled.div`
  width: fit-content;
  position: fixed;
  bottom: 0px;
  right: 0;
  z-index: 1;

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
