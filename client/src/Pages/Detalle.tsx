import styled from "styled-components";
import img from '../components/Utils/prueba.png';
import { useState} from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { Themes } from "../components/Theme/Theme";
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
            <div className="det__dec">NOMBRE DEL PODRUCTO</div> 
            <div className="det__dec1">Stock</div> 
            <div className="det__dec0">$</div>               
            <div className="det__dec2">DESCRIPCIÓN: El martillo es una herramienta de percusión utilizada para golpear directamente o indirectamente una pieza, causando su desplazamiento. </div> 
          </div> 
          <div className="det_cant">
            <div className="det__dec3">Cantidad</div> 
            <button disabled={count === 0} onClick={()=> setCount(count - 1)} className='button__card'> - </button>
            <h3>{count}</h3>
            <button onClick={()=> setCount(count + 1)} className='button__card2'> + </button>    
            <div className="det__pro">AGREGAR A FAVORITOS</div>        
            <h3 className="det_fav"><MdFavoriteBorder/> <MdFavorite/></h3>
            <div className="det__pro">AGREGAR PRODUCTO</div>
            <h3 className="det_shop"><AiOutlineShoppingCart/></h3>  
          </div>  
        </div>          
      </DetalleContainer>      
    )
  };
export default Detalle

const DetalleContainer = styled.div`
  
 
  
.det__container{
    width: 1200px;    
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
  left: 65px;
  top: 55px;
  
}
.det_props{
  width: 500px;
  height: 500px;
  background-color: red;
  position: relative;
  left: 580px;
  bottom: 335px;
  
}
.det_cant{
  width: 500px;
  height: 205px;
  background-color: blue;
  position: relative;
  left: 580px;
  bottom: 335px;
}


`; 

