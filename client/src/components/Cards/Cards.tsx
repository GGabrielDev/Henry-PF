import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getProducts, selectProducts } from "../../features/products/productSlice"
import Card from "../Card";

export default function Cards(){
    const products = useAppSelector(selectProducts);
    const dispatch= useAppDispatch();
    console.log(products)
    useEffect(()=>{
        dispatch(getProducts())
    },[])

    return(
    <>
        <div>
            {products.map((e)=>{
                return(
                    <Card key={e.id} name={e.name} price_local={e.price_local} image={e.image} />
                )
            })}
        </div>
    </>
    )
}