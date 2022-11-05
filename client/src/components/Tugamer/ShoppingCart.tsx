import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "../../features/products/productSlice";
import { CartItem } from "./CartItem";
import {  useShoppingCart } from "./context/SoppingCartContext";

type ShoppingCartProps = {
    isOpen: boolean
}

export default function SoppingCart({isOpen}: ShoppingCartProps){
    const {closeCart, cartItems} = useShoppingCart()
    const item = useAppSelector(selectProducts)
    
    
    return (
        <>
        {isOpen?<ShoppingCart>
            <ShoppingCartContainer >
             
            <div className="Header">
                <h1>Cart</h1>
                <span className="close" onClick={closeCart}>x</span>
            </div>
            <div className="info__carro">
                {cartItems.map(item =>(
                    <div className="info__carta">
                    <CartItem key={item.id} {...item} />
                    </div>
                ) )}
            </div>
            <div className="info__total">
                <div style={{fontSize:"40px", fontWeight:"600" }}>
                    Total:
                    </div>
                    <div style={{fontSize:"35px", fontWeight:"600" }}>
                     {cartItems.reduce((total, cartItem)=>{
                        const itemFind = item && item.find(e => e.id === cartItem.id)
                        return total + (itemFind?.price_local||0) * cartItem.quantity
                    },0)}</div>
            </div>
            </ShoppingCartContainer>
        </ShoppingCart>:''}
        </>
    ) 
}

const ShoppingCart = styled.div`
position:fixed;
background-color: #111111bd;
top:0;
bottom: 0;
left: 0;
right: 0;
display: flex;


`
const ShoppingCartContainer = styled.div`
    margin: auto;
    width:900px;
    border:rgba(0, 0, 0, 0.1);
    height: auto;
    background-color: white;
    border-radius: 15px;
    justify-content: space-evenly;
    align-items: center;
.Header{
    display  :flex ;
    justify-content: space-between;
    font-size: 1.7rem;
    padding: 8px;

  
  
}
.info__carta{
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
    align-items: center;
}
.info__carro{
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
}

.close{
    cursor: pointer;
}
.info__total{
    border-radius: 5px;
    align-items: center;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.1);
    height: auto;
    display: flex;
    justify-content: space-evenly;
}
`