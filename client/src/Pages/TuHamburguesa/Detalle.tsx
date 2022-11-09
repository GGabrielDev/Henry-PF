import styled from "styled-components";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import Navbar from "../../components/TuHamburguesa/Navbar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  detailProduct,
  getProductId,
  ProductType,
} from "../../features/products/productSlice";
import { actions, helpers } from "../../features/cart/cartSlice";
import { ThemeProvider } from "styled-components";
import { Themes } from "../../components/TuHamburguesa/Theme/Theme";

const { getItemQuantity } = helpers;
const { incrementItemQuantity, decrementItemQuantity } = actions;

const Detalle = () => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };
  const { productId } = useParams<{ productId?: string }>();
  const dispatch = useAppDispatch();
  const detalle = useAppSelector(detailProduct) as ProductType;
  const quantity = useAppSelector(getItemQuantity(detalle));
  useEffect(() => {
    console.log(productId);
    dispatch(getProductId(productId));
  }, [productId]);
  if (productId) {
    return (
      <>
        <ThemeProvider theme={Themes}>
          <Navbar />
          <DetalleContainer>
            <div className="cajita__maxima">
              <div className="imagen__caja">
                <div className="det_fot">
                  <img
                    src={detalle.image}
                    alt="producto"
                    className="det__img1"
                  />
                </div>
              </div>
              <div className="det__container">
                <div className="fav">
                  <h3
                    onClick={handleActive}
                    className={active ? "det_fav active" : "det_fav"}
                  >
                    <MdFavorite />
                  </h3>
                </div>
                <div className="det_props">
                  <div className="det__dec">{detalle.name}</div>
                  <div className="det__dec0">
                    valor de: {detalle.price_local} $
                  </div>
                  <div className="det__dec2">
                    Descripción: {detalle.description}
                  </div>
                </div>
                <div className="det_cant">
                  <div className="det__cant2">
                    <div className="det__dec3">
                      Cantidad en stock: {detalle.stock - quantity}
                    </div>
                    <div className="det__dec4">Cantidad que desea comprar:</div>
                    <div className="botones">
                      <button
                        disabled={quantity === 0}
                        onClick={() => dispatch(decrementItemQuantity(detalle))}
                        className="button__card"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <h3 className="count">{quantity}</h3>

                      <button
                        disabled={!(detalle.stock - quantity > 0)}
                        onClick={() => dispatch(incrementItemQuantity(detalle))}
                        className="button__card"
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div className="button__card__container">
                    <button className="button__card">COMPRAR AHORA</button>
                  </div>
                </div>
              </div>
            </div>
          </DetalleContainer>
        </ThemeProvider>
      </>
    );
  } else {
    return <div>Loading ...</div>;
  }
};
export default Detalle;

const DetalleContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding-top: 100px;

  .cajita__maxima {
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid ${({ theme }) => theme.border}; */
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 20px;
  }

  .imagen__caja {
    display: flex;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
  }

  .det__container {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 20px;
  }

  .fav {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
  }

  .det_fot {
    width: 200px;
    border-radius: 10px;
    margin: 10px;

    .det__img1 {
      padding: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .det__dec {
    text-align: start;
    font-size: 30px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .det__dec2,
  .det__dec3,
  .det__dec4 {
    margin-bottom: 10px;
  }

  .det__dec0 {
    text-align: start;
    margin-bottom: 10px;
  }

  .det_props {
    width: 500px;
  }

  .count {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .botones {
    width: 500px;
    display: flex;
    margin-bottom: 10px;
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
    path {
      color: ${({ theme }) => theme.tertiary};
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        color: #a35454;
        opacity: 0.7;
      }
    }
  }

  .active {
    path {
      color: ${({ theme }) => theme.error};
      &:hover {
        color: ${({ theme }) => theme.error};
      }
    }
  }

  @media screen and (max-width: 855px) {
    .cajita__maxima {
      flex-direction: column-reverse;
      width: 90%;
    }

    .imagen__caja {
      margin: 0;
    }

    .det_fot {
      width: 90%;
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
    .det__dec {
      text-align: center;
    }

    .det__dec0 {
      text-align: center;
    }

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
