import styled from "styled-components";
import img from "../components/Utils/prueba.png";
import { useState } from "react";
import { MdFavorite } from "react-icons/md";
import Navbar from "../components/Navbar";

const Detalle = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <DetalleContainer>
        <div className="det__container">
          <div className="det_fot">
            <img src={img} alt="producto" className="det__img1" />
          </div>
          <div className="det_props">
            <div className="det__dec">Placa de videos aourus 2080ti</div>
            <div className="det__dec0">$325.251</div>
            <div className="det__dec2">
              ***LO QUE TENES QUE SABER DE ESTE PRODUCTO*** Cantidad de memoria
              12GB interfaz de memoria 384 bits Tipo de DRAM GDDR6X Reloj de
              gráficos 1260 MHz Reloj de impulso 1710 MHz Reloj de la memoria 19
              Gb/s Núcleos CUDA 8960 Ancho de banda de memoria (GB/seg) 912
              microsoftdirectx Microsoft DirectX® 12 último OpenGL 4.6 Soporte
              de autobús PCI-E 4.0 HDMI hdmi 2.1 DisplayPort DP1.4a x 3 Máxima
              Resolución Digital 7680x4320 Altura ranura 2.7 Tamaño del tablero
              304x136x60mm Potencia de la tarjeta gráfica 350W Potencia mínima
              recomendada del sistema 850W Conectores de alimentación
              suplementarios 8 pines X3
            </div>
          </div>
          <div className="det_cant">
            <div className="det__cant2">
              <div className="det__dec3">Cantidad en stock: 8</div>
              <div className="det__dec4">Cantidad que desea comprar:</div>
              <div className="botones">
                <button
                  disabled={count === 0}
                  onClick={() => setCount(count - 1)}
                  className="button__card"
                >
                  {" "}
                  -{" "}
                </button>
                <h3 className="count">{count}</h3>
                <button
                  onClick={() => setCount(count + 1)}
                  className="button__card"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
            <div className="fav">
              <h3 className="det_fav">
                <MdFavorite />
              </h3>
            </div>
            <div className="button__card__container">
              <button className="button__card">COMPRAR AHORA</button>
            </div>
          </div>
        </div>
      </DetalleContainer>
    </>
  );
};
export default Detalle;

const DetalleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 130px;

  .det__container {
    width: 100%;
    background-color: ${({ theme }) => theme.cream2};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  .det_fot {
    width: 200px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    margin-bottom: 10px;
    .det__img1 {
      padding: 5px;
      width: 100%;
    }
  }

  .det__dec {
    text-align: center;
    text-decoration: underline;
    margin-bottom: 10px;
  }

  .det__dec2,
  .det__dec4 {
    margin-bottom: 10px;
  }

  .det_props {
    width: 600px;
  }

  .count {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .botones {
    width: 600px;
    display: flex;
    justify-content: space-around;
  }

  .button__card__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button__card {
    background-color: ${({ theme }) => theme.primary};
    border: transparent;
    padding: 5px 10px;
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border: transparent;
    }
    &:focus {
      border: transparent;
    }
  }

  .det_fav {
    text-align: center;
  }

  .det_fav {
    path {
      color: ${({ theme }) => theme.tertiary};
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.error};
      }
    }
  }
`;
