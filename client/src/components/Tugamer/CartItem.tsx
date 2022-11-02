import { useAppSelector } from "../../app/hooks"
import { selectProducts } from "../../features/products/productSlice"
import { useShoppingCart } from "./context/SoppingCartContext"
import image from '../../assets/imagenesSlider/49838.jpg'
type CartItemProps={
    id:string
    quantity:number
}

export function CartItem({id, quantity}:CartItemProps){
    const {removeFromCart }=useShoppingCart()
    const item = useAppSelector(selectProducts)
    const itemFind= item.find(e => e.id === id)
    if(itemFind == null) return null

    return(

        <>
            <img src={image} style={{width:"125px", height:"75px", objectFit:"cover"}} alt=''/>
            <div>
                {itemFind.name}{""}
                {quantity >1 && (
                    <span>x{quantity}</span>
                )}
            </div>
            <div>
                {itemFind.price_local}
            </div>
            <div>
                {itemFind.price_local*quantity}
            </div>
            <button onClick={()=> removeFromCart(itemFind.id)}></button>
        </>
    )
}

function formatCurrency(price_local: number): import("react").ReactNode {
    throw new Error("Function not implemented.")
}
