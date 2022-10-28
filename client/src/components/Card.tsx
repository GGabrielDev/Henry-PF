import { useState} from "react";
import styled from "styled-components";
import { Themes } from "./Theme/Theme";
import img from './Utils/prueba.png';
import { AiOutlineShoppingCart } from 'react-icons/ai';


//foto, precio, cantidad, agregar carrito, nombre
const Card = () =>{
    const [count, setCount]= useState(0);   
       
    return(
        <CardContainer>
            <div className='card__container'>
                <div>
                <img src={img} alt='' className="card__image"/>
                </div>                                                     
                <div className="card__info">                               
                <div className="card_color_name">Tornillo</div>              
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
                <h3 className="card_shop"><AiOutlineShoppingCart/></h3>  
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
    font-size: 40px;
    position: relative;    
    left: 78px;
    border-radius: 50px;  
    bottom: 33px;
}
.card_color_name{    
    font-size: 17px;
    color: ${Themes.dark}; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    position: relative;
    left: 10px;
        
}
.card_color_price{
    position: relative;
    color: ${Themes.primary};
    top: 5px; 
    }

.card__container:hover{
    transform: scale(1.1); 
    box-shadow: 2px 2px 15px #30303076;    
}
`; 



