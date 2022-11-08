import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img from "./Utils/prueba.png";
import img2 from "./Utils/tipo.jpg";
import { BsInfoCircle } from "react-icons/bs";
import { useShoppingCart } from "./context/SoppingCartContext";
import { count } from "console";
import Swal from "sweetalert2";
import { ProductType } from "../../features/products/productSlice";

//NECESITAMOS Q LA IMAGEN SEA 320x285 hasta hacer la card responsive
const Card = ({ product }: { product: ProductType }) => {
  const { getItemQuantity, incrementCartQuantity, decrementCartQuantity } =
    useShoppingCart();
  const quantity = getItemQuantity(product);
  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Error",
      text: "Debes tener algun producto en el carrito",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  return (
    <CardContainer>
      <div className="card__container">
        <div className="card__image">
          <img src={product.image} alt="" className="card__image" />
        </div>
        <div className="card__info">
          <div className="card_color_name">{product.name}</div>
          <div className="card__name__price">
            <h2 className="card_color_price">{product.price_local}</h2>
          </div>
          <div className="card__sumaresta">
            <div className="card__buttons">
              <button
                disabled={quantity === 0}
                onClick={() => decrementCartQuantity(product)}
                className="button__card"
              >
                {" "}
                -{" "}
              </button>
              <h3>{quantity}</h3>
              <button
                onClick={() => incrementCartQuantity(product)}
                className="button__card"
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="div__comprar">
          <Link to={`/tugamer/detalle/${product.id}`}>
            <div className="info">
              <BsInfoCircle />
            </div>
          </Link>
          {quantity > 0 ? (
            <button className="button">COMPRAR</button>
          ) : (
            <button onClick={() => AlertaCorrecta()} className="button">
              COMPRAR
            </button>
          )}
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
const CardContainer = styled.div`
  border-radius: 10px;
  margin: 15px;
  background-color: white;
  width: 200px;

  .div__comprar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    font-size: 35px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.dark};
    cursor: pointer;
  }

  .comp {
    position: relative;
    font-size: 15px;
    left: 5px;
    bottom: 20px;
  }
  .card__container {
    padding: 10px;
    max-width: 200px;
    max-height: 100%;
    box-shadow: 2px 2px 15px #30303021;
    border-radius: 13px;

    justify-content: space-evenly;
    transition: 0.3s;

    &:hover {
      box-shadow: 2px 2px 15px #3030304c;
    }
  }

  .card__sumaresta {
  }
  .comprar {
    position: relative;
    bottom: 5px;
    left: 55px;
  }

  .card__image {
    position: relative;
    max-width: 200px;
    max-height: 100%;
    border-radius: 15px;

    img {
      width: 100%;
    }
  }

  .talle__off {
    background: none;
    border-radius: 50px;
    width: 20px;
    height: 20px;
    border: none;
  }
  .card__buttons {
    display: flex;
    background-color: none;
    border-radius: 50px;
    align-items: center;
    justify-content: end;
    padding-right: 10px;
    gap: 15px;
  }

  .card__name__price {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
  }
  .button__card {
    background: none;
    border-radius: 50px;
    width: 20px;
    height: 20px;
    border: none;
    position: relative;
    cursor: pointer;
  }
  .card_shop {
    font-size: 35px;
    position: relative;
    left: 85px;
    border-radius: 50px;
    bottom: 55px;
  }

  .card_color_name {
    font-size: 17px;
    color: ${({ theme }) => theme.dark};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .card_color_price {
    position: relative;
    color: ${({ theme }) => theme.primary};
    top: 5px;
  }

  .button {
    position: relative;
    height: 30px;
    padding: 10px;
    margin-right: 10px;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: 20px;
      margin-right: 5px;
    }
    &:hover {
      border: 1px solid ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      svg {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

function formatCurrency(price_local: number): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
