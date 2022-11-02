import styled from "styled-components";
import { CartItem } from "./CartItem";
import {  useShoppingCart } from "./context/SoppingCartContext";

type ShoppingCartProps = {
    isOpen: boolean
}

export default function SoppingCart({isOpen}: ShoppingCartProps){
    const {closeCart, cartItems} = useShoppingCart()
    return (
        <ShoppingCart >
            <div className="Header">
                <title>Cart</title>
            </div>
            <div>
                {cartItems.map(item =>(
                    <CartItem key={item.id} {...item} />
                ) )}
            </div>
            
        </ShoppingCart>
        
    ) 
}

const ShoppingCart = styled.div`
.Header{

}

`