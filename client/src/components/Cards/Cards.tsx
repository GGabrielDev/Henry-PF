import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProducts,
  selectProducts,
} from "../../features/products/productSlice";
import Card from "../Card";
<<<<<<< HEAD
=======

>>>>>>> 2d58ec8ead41f943ccb53708433c9c0ad0c8c1bb
import styled from "styled-components";
export default function Cards(){
    const products = useAppSelector(selectProducts);
    const dispatch= useAppDispatch();
    console.log(products)
    useEffect(()=>{
        dispatch(getProducts())
    },[])

  return (
    <>
        <DivCards>
            {products?.map((e)=>{
                return(

                    <Card key={e.id} name={e.name} price_local={e.price_local} image={e.image} />
                )
            })}
        </DivCards>
    </>
  );
}
const DivCards = styled.div`
    background-color: blue;
    width:100%;
    display:flex;
    justify-content: space-around;
    flex-wrap: wrap;
   
<<<<<<< HEAD
`
=======
`
>>>>>>> 2d58ec8ead41f943ccb53708433c9c0ad0c8c1bb
