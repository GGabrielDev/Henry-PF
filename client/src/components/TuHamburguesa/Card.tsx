import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductType } from "../../features/products/productSlice";
import { actions, helpers } from "../../features/cart/cartSlice";

const { incrementItemQuantity, decrementItemQuantity } = actions;
const { getItemQuantity } = helpers;

//NECESITAMOS Q LA IMAGEN SEA 320x285 hasta hacer la card responsive
const Card = ({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(getItemQuantity(product));
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
                onClick={() => dispatch(decrementItemQuantity(product))}
                className="button__card"
              >
                {" "}
                -{" "}
              </button>
              <h3>{quantity}</h3>
              <button
                onClick={() => dispatch(incrementItemQuantity(product))}
                className="button__card"
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="div__comprar">
          <Link to={`/tuhamburguesa/detalle/${product.id}`}>
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
  height: 400px;

  .div__comprar {
    width: 100%;
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

  .card__info {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .card__container {
    padding: 10px;
    max-width: 200px;
    max-height: 100%;
    box-shadow: 2px 2px 15px #30303021;
    border-radius: 13px;
    justify-content: space-evenly;
    transition: 0.3s;
    overflow: hidden;
    &:hover {
      box-shadow: 2px 2px 15px #3030304c;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .card__sumaresta {
  }
  .comprar {
    position: relative;
    bottom: 5px;
    left: 55px;
  }

  .card__image {
    overflow: hidden;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    img {
      width: 100%;
      height: auto;
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
    gap: 15px;
  }

  .card__name__price {
    display: flex;
    font-size: 12px;
    justify-content: center;
    width: 100px;
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
    width: 100%;
    color: ${({ theme }) => theme.dark};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    text-align: center;
  }

  .card_color_price {
    color: ${({ theme }) => theme.primary};
  }

  .button {
    position: relative;
    height: 30px;
    padding: 10px;
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
