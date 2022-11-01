import styled from "styled-components";
import img from "../../components/Tugamer/Utils/prueba.png";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import Navbar from "../../components/Tugamer/Navbar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { detailProduct, getProductId, ProductType } from "../../features/products/productSlice";

const Detalle = () => {
  const [count, setCount] = useState(0);
  const dispatch= useAppDispatch();
  const detalle = useAppSelector(detailProduct) as ProductType;
  const { id }  = useParams<{id?:string}>();
  useEffect(()=>{
    console.log(id)
    dispatch(getProductId(id))
  },[dispatch, id])
  
  console.log(detalle)
  if(id){
  return (
    <>
      <Navbar />
      <DetalleContainer>
        <div className="imagen__caja">
          <div className="det_fot">
            <img src={img} alt="producto" className="det__img1" />
          </div>
        </div>
        <div className="det__container">
          <div className="det_props">
            <div className="det__dec">{detalle.name}</div>
            <div className="det__dec0">{detalle.price_local}</div>
            <div className="det__dec2">
              {detalle.description}
            </div>
          </div>
          <div className="det_cant">
            <div className="det__cant2">
              <div className="det__dec3">Cantidad en stock: {detalle.stock}</div>
              <div className="det__dec4">Cantidad que desea comprar:</div>
              <div className="botones">
                <button
                  disabled={count === 0}
                  onClick={() => setCount(count - 1)}
                  className="button__card"
                >
                  {" "}
                  -{" "}
                </button>
                <h3 className="count">{count}</h3>
                <button
                  onClick={() => setCount(count + 1)}
                  className="button__card"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
            <div className="fav">
              <h3 className="det_fav">
                <MdFavorite />
              </h3>
            </div>
            <div className="button__card__container">
              <button className="button__card">COMPRAR AHORA</button>
            </div>
          </div>
        </div>
      </DetalleContainer>
    </>
  );
}else{
  return <div>Loading ...</div>;
}
};
export default Detalle;

const DetalleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 130px;

  .imagen__caja {
    display: flex;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
  }

  .det__container {
    background-color: ${({ theme }) => theme.cream2};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 10px;
  }

  .det_fot {
    width: 200px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    margin-bottom: 10px;
    transition: 0.5s;
    &:hover {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .det__img1 {
      padding: 5px;
      width: 100%;
    }
  }

  .det__dec {
    text-align: center;
    text-decoration: underline;
    margin-bottom: 10px;
  }

  .det__dec2,
  .det__dec4 {
    margin-bottom: 10px;
  }

  .det__dec0 {
    text-align: center;
    margin-bottom: 10px;
  }

  .det_props {
    width: 600px;
  }

  .count {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .botones {
    width: 600px;
    display: flex;
    justify-content: space-around;
  }

  .button__card__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button__card {
    background-color: ${({ theme }) => theme.primary};
    border: transparent;
    padding: 5px 10px;
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border: transparent;
    }
    &:focus {
      border: transparent;
    }
  }

  .det_fav {
    text-align: center;
  }

  .det_fav {
    path {
      color: ${({ theme }) => theme.tertiary};
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        color: ${({ theme }) => theme.error};
      }
    }
  }

  @media screen and (max-width: 855px) {
    flex-direction: column;

    .det_fot {
      width: 300px;
    }

    .det_props {
      width: 100%;
    }

    .det_cant {
      width: 100%;
    }

    .botones {
      width: 100%;
    }
  }

  @media screen and (max-width: 500px) {
    .det__dec2 {
      text-align: center;
    }

    .det__dec3 {
      text-align: center;
    }

    .det__dec4 {
      text-align: center;
    }
  }
`;
