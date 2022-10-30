import styled from "styled-components";
import img from '../components/Utils/prueba.png';
import { useState} from "react";
import { MdFavorite } from 'react-icons/md';
import Navbar from "../components/Navbar"

  

const Detalle = () => {
  const [count, setCount]= useState(0);
 
 
    return (
      <DetalleContainer>
        <Navbar />
        <div className='det__container'>
          <div className="det_fot">          
            <img src = {img} alt= "producto" className="det__img1" />           
          </div>
          <div className="det_props">
            <div className="det__dec">Placa de videos aourus 2080ti</div>            
            <div className="det__dec0">$325.251</div>               
            <div className="det__dec2">
            ***LO QUE TENES QUE SABER DE ESTE PRODUCTO***                 
              Cantidad de memoria 12GB 
              interfaz de memoria 384 bits           
              Tipo de DRAM GDDR6X
              Reloj de gráficos 1260 MHz
              Reloj de impulso 1710 MHz
              Reloj de la memoria 19 Gb/s
              Núcleos CUDA 8960
              Ancho de banda de memoria (GB/seg) 912
              microsoftdirectx Microsoft DirectX® 12 último
              OpenGL 4.6
              Soporte de autobús PCI-E 4.0
              HDMI hdmi 2.1
              DisplayPort DP1.4a x 3
              Máxima Resolución Digital 7680x4320
              Altura ranura 2.7
              Tamaño del tablero 304x136x60mm
              Potencia de la tarjeta gráfica 350W
              Potencia mínima recomendada del sistema 850W
              Conectores de alimentación suplementarios 8 pines X3
            </div> 
          </div> 
          <div className="det_cant">
            <div className="det__cant2">
            <div className="det__dec3">Cantidad en stock: 8</div> 
            <div className="det__dec4">Cantidad que desea comprar:</div>
            <div className="botones">
            <button disabled={count === 0} onClick={()=> setCount(count - 1)} className='button__card'> - </button>
            <h3 className="count">{count}</h3>
            <button onClick={()=> setCount(count + 1)} className='button__card2'> + </button>    
            </div>
            </div>
            <div className="fav">                   
            <h3 className="det_fav"><MdFavorite/></h3>
            </div>
            <button className="button">
            <div className="compras">
            <div className="det__pro">COMPRAR AHORA</div>
            
            </div>
            </button>
          </div>  
        </div>          
      </DetalleContainer>      
    )
  };
export default Detalle

const DetalleContainer = styled.div`
  
 
  
.det__container{
    width: 1000px;    
    border-radius:15px;
    height: 750px;
    box-shadow: 2px 2px 15px #30303021;     
    position: absolute;     //50% -(900% / 2)
    top: 25%;
    left: 23%;    
}
.det__container:hover{
  transform: scale(1.1); 
  box-shadow: 2px 2px 15px #30303076;
}
.det__img1{
  width: 350px;
  height: 350px;
  position: relative; 
  left: 120px;
  top: 100px;  
}
.det_props{
  width: 400px;
  height: 650px;  
  position: relative;
  left: 580px;
  bottom: 335px;  
}
.det_cant{
  width: 500px;
  height: 205px;   
  position: relative;
  left: 10px;
  bottom: 550px;
}
.det__dec{
  position: relative;
  font-size: 35px;
  text-decoration: underline;

}
.det__dec0{
  font-size: 35px;
  color:${({ theme }) => theme.primary};
  position: relative;
  top: 40px;
}
.det__dec2{
  position: relative;
  top: 75px;
}
.det__dec3{
  font-size: 25px;
  position: relative;
  bottom: 20px;
  right: 1px;
}
.det__dec4{
  font-size: 20px;
 
}
.button__card{
  position: relative;
  top: 10px;
  font-size: 25px;
  border-radius: 15px;
}
.count{
position: relative;
left: 37px;
bottom: 28px;
font-size: 25px;
}
.button__card2{
  position: relative;
  bottom: 68px;
  left: 70px;
  font-size: 24px;
  border-radius: 15px;
}
.botones{
  position: relative;
  left: 325px;
  bottom: 45px;
}
.det_fav{
  position: relative;  
  font-size: 35px;   
  left: 930px;
  bottom: 620px;
}
.det_fav:hover{
  position: relative;
  color: ${({ theme }) => theme.error};
  transform: scale(1.05); 
  left: 945px;
  bottom: 620px;
}

.det__pro{
  position: relative;
  right: 55px; 
  left: 270px;
  bottom: 55px;
  font-size: 22px;
}

.compras{
  position: relative;
  right: 270px;
  top: 54px;
}
.det__cant2{
  position: relative;
  top: 35px;
}

.button {
    position: relative;
    left: 365px;
    bottom: 15px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border: 1px solid transparent;
    padding: 7px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: 20px;
      margin-right: 5px;
    }
    &:hover {
      border: 1px solid ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      svg {
        color: ${({ theme }) => theme.primary};
      }
    }
  }


`; 

