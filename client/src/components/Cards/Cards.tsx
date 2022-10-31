import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProducts,
  selectProducts,
} from "../../features/products/productSlice";
import Card from "../Card";
import styled from "styled-components";
export default function Cards(){
    const products = useAppSelector(selectProducts);
    const dispatch= useAppDispatch();
   
    useEffect(()=>{
        dispatch(getProducts())
    },[])

  return (
    <>
        <DivCards>
            {products?.map((e)=>{
                return(

                    <Card key={e.id} name={e.name} price_local={e.price_local} image={e.image} id={e.id} />
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
   
`
