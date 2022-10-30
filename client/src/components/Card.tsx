import { useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img from './Utils/prueba.png';

import { BsInfoCircle } from 'react-icons/bs';


//NECESITAMOS Q LA IMAGEN SEA 320x285 hasta hacer la card responsive
const Card = () =>{
    const [count, setCount]= useState(0);   
       
    return(
        <CardContainer>
            <div className='card__container'>
               <Link to={"/detalle"}>
                <div className="info">
                <BsInfoCircle/>
                </div>
               </Link>
                <div>
                <img src={img} alt='' className="card__image"/>
                </div>                                                     
                <div className="card__info">                               
                <div className="card_color_name">Placa de Video MSI 3080</div>              
                <div className="card__name__price">
                <h2 className="card_color_price">59.99$</h2>
                </div>
                <div className="card__sumaresta">         
                <div className="card__buttons">
                <button disabled={count === 0} onClick={()=> setCount(count - 1)} className='button__card'> - </button>
                <h3>{count}</h3>
                <button onClick={()=> setCount(count + 1)} className='button__card'> + </button>
                </div>  
                 </div> 
                </div>               
                <button className="button">COMPRAR</button>         
                             
            </div>          
            
        </CardContainer>
    )
}

export default Card
const CardContainer = styled.div`
  width: 100%;
  height:100%;
  margin-top: 30px;
  margin-left: 15px;
  

.card__info{
    position: relative;
    bottom: 10px;
}  
.info{
    position: absolute;  
    font-size: 35px;
    margin-top:259px;
    margin-left: 20px;    
    color: ${({ theme }) => theme.dark};
    cursor: pointer;
}
.info:hover{
    transform: scale(1.1);  
    color: ${({ theme }) => theme.primary};
 }

.comp{
    position: relative;
    font-size: 15px;
    left: 5px;
    bottom: 20px;
}
.card__container{
    max-width: 200px;    
    border-radius:15px;
    max-height: 300px;
    box-shadow: 2px 2px 15px #30303021;    
}
.card__sumaresta{
    position: relative;
    left: 100px ;    
}
.comprar{
    position: relative;
    bottom: 5px;
    left: 55px;
}

.card__image{
    max-width: 100%;
    max-height: 100%;    
    border-radius:15px;  
}

.talle__off{
    background:none;
    border-radius:50px;
    width:20px;
    height:20px;
    border:none; 
}
.card__buttons{
    position: relative;
    display:flex;
    background-color:none;
    border-radius:50px;
    justify-content:space-evenly;
    align-items: center;   
    width:50%;
    height:100%;
    margin-top:5px;
    margin-bottom:5px;    
    bottom : 29px;
    right: 7px ;
} 

.card__name__price{
    margin-left:10px;
    margin-right:10px;
    display: flex;
    font-size:12px;
    justify-content:space-between;
}
.button__card{
    background:none;
    border-radius:50px;
    width:20px;
    height:20px;
    border:none;  
    position: relative;    
   
}
.card_shop{      
    font-size: 35px;
    position: relative;    
    left: 85px;
    border-radius: 50px;  
    bottom: 55px;
}
.card_color_name{    
    font-size: 17px;
    color: ${({ theme }) => theme.dark}; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    position: relative;   
        
}
.card_color_price{
    position: relative;
    color: ${({ theme }) => theme.primary}; 
    top: 5px; 
    }

.card__container:hover{
    transform: scale(1.1); 
    box-shadow: 2px 2px 15px #30303076;    
}

.button{    
    position: relative;
    bottom: 35px;
    left: 100px;
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



