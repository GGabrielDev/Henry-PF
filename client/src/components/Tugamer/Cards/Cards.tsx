import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getProducts,
  selectProducts,
} from "../../../features/products/productSlice";
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
            {products?.map((e:any)=>{
                return(
                    <div className="gridcard" key={e.id}>
                        <Card  name={e.name} price_local={e.price_local} image={e.image} id={e.id} />
                    </div>

                )
            })}
        </DivCards>
    </>
  );
}
const DivCards = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    overflow: auto;

    @media screen and (max-width: 940px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 725px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 475px){
        grid-template-columns: repeat(4, 1fr);
        overflow: auto;
    }
    @media screen and (min-width: 1400px){
        grid-template-columns: repeat(5, 1fr);
        overflow: auto;
    }


    .gridcard{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* display:flex;
    justify-content: space-around;
    flex-wrap: wrap; */
   
`
