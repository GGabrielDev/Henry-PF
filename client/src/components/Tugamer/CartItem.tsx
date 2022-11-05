import { useAppSelector } from "../../app/hooks"
import { selectProducts } from "../../features/products/productSlice"
import { useShoppingCart } from "./context/SoppingCartContext"
import image from '../../assets/imagenesSlider/49838.jpg'
import styled from "styled-components";

type CartItemProps={
    id:string
    quantity:number
}

export function CartItem({id, quantity}:CartItemProps){
    const {removeFromCart}=useShoppingCart()
    const item = useAppSelector(selectProducts)
    const itemFind= item?.find(e => e.id === id)
    if(itemFind == null) return null

    return(

        <>
            <img src={image} style={{width:"205px", height:"105px", objectFit:"cover", borderRadius:"7px", border:"0.5px solid rgba(0, 0, 0, 0.1)"}} alt=''/>
            <div style={{fontSize:"20px", fontWeight:"500" }}>
                {itemFind.name}{" "}
                {quantity >1 && (
                    <span style={{fontSize:"12px", fontWeight:"400" }}>x {quantity}</span>
                )}
            </div>
            <div style={{fontSize:"17px", fontWeight:"600" }}>
                {itemFind.price_local}
            </div>
            <div style={{fontSize:"20px", fontWeight:"600" }}>
               Sub total: {itemFind.price_local*quantity}
            </div>
            <button style={{width:"60px", height:"30px", backgroundColor:"#d90057", color:"white ", border:"none", borderRadius:"7px", cursor:"pointer"}} onClick={()=> removeFromCart(itemFind.id)}>Quitar</button>
        </>
    )
}

function formatCurrency(price_local: number): import("react").ReactNode {
    throw new Error("Function not implemented.")
}


