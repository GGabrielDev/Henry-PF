import { useState} from "react";
import styled from "styled-components";
import { Themes } from "./Theme/Theme";
import img from './Utils/prueba.png';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import info from "./Utils/info.png"

//foto, precio, cantidad, agregar carrito, nombre
const Card = () =>{
    const [count, setCount]= useState(0);   
    const [talles, setTalles]=useState('')    
    return(
        <CardContainer>
            <div className='card__container'>
                <div>
                <img src={img} alt='' className="card__image"/>
                </div>           
                                          
                <div className="card__info">
                <div className="card__name__price">
                <h1 className="card_color_name">Nombre</h1>
                <h2 className="card_color_price">59.99$</h2>
                </div>
                <div className="talles__count">
                <div className="card__talles">
                <button onClick={()=> setTalles('S')} className={talles === 'S'? 'talle__general': 'talle__off'}> S </button>
                <button onClick={()=> setTalles('M')} className={talles === 'M'? 'talle__general': 'talle__off'}> M </button> 
                <button onClick={()=> setTalles('L')} className={talles === 'L'? 'talle__general': 'talle__off'}> L </button>  
                <button onClick={()=> setTalles('XL')} className={talles === 'XL'? 'talle__general': 'talle__off'}> XL </button>                    
                
               
                </div>
                <div className="card__buttons">
                <button disabled={count === 0} onClick={()=> setCount(count - 1)} className='button__card'> - </button>
                <h3>{count}</h3>
                <button disabled={talles === ""}onClick={()=> setCount(count + 1)} className='button__card'> + </button>
                </div>  
                 </div> 
                <h3 className="card_shop"><AiOutlineShoppingCart/></h3>  
                </div>          
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
    width: 200px;    
    border-radius:15px;
    height: 300px;
    box-shadow: 2px 2px 15px #30303021;    
}

.card__container:hover{
    transform: scale(1.1); 
    box-shadow: 2px 2px 15px #30303076;    
}
.talle__general{
    border:2px solid ${Themes.primary};
    background:none;
    border-radius:50px;
    width:20px;
    height:20px;
    position:relative
    
}
.card__image{
    width:100%;
    height: 100%;
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
    
    
} 
.talles__count{
    display:flex;
    justify-content: space-between;
    
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
}
.card_shop{  
    top: 15px;
    font-size: 40px;
    position: relative;    
    left: 75px;
    border-radius: 50px;      
}
.card_color_name{
    position: relative;
    color: ${Themes.secondary}
}
.card_color_price{
    position: relative;
    color: ${Themes.primary};
    top: 7px;    
}
.card__talles{   
    display:flex;
    width: 100px;
    margin-left:10px;
    margin-right:10px;
    align-items: center;
    justify-content:space-between;

}


`; 



