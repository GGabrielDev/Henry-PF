import { SyntheticEvent } from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProducts } from "../../features/products/productSlice";
import { actions, selectors } from "../../features/cart/cartSlice";
import { CartItem } from "./CartItem";
import { useAuth0 } from "@auth0/auth0-react";
import Flotantbutton from "./Home/button/Flotantbutton";

type ShoppingCartProps = {
  isOpen: boolean;
};

const { toggleCart } = actions;
const { selectCartItems } = selectors;

export default function SoppingCart({ isOpen }: ShoppingCartProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const item = useAppSelector(selectProducts);

  const handleBuy = async (e: SyntheticEvent) => {
    e.preventDefault();

    alert("Coming soon");
  };
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      {isOpen ? (
        <ShoppingCart>
          <ShoppingCartContainer>
            <div className="menu">
              <div className="content" onClick={() => dispatch(toggleCart())}>
                <span className="close">
                  <AiOutlineArrowLeft />
                </span>
                <h1 className="title__cart">Cart</h1>
              </div>
              <div className="info__carro">
                {cartItems.map((item: any) => (
                  <div className="info__carta" key={item.product.id}>
                    <CartItem {...item} />
                  </div>
                ))}
              </div>
              <div className="info__total">
                <div className="total__price">
                  Total:
                  <div className="total">
                    {cartItems.reduce((total: any, cartItem: any) => {
                      const itemFind = item.find(
                        (e) => e.id === cartItem.product.id
                      );
                      return (
                        total + (itemFind?.price_local || 0) * cartItem.quantity
                      );
                    }, 0)}
                  </div>
                </div>
                <button className="comprar__cart">
                  Comprar
                  <Flotantbutton />
                </button>
              </div>
            </div>
          </ShoppingCartContainer>
        </ShoppingCart>
      ) : (
        ""
      )}
    </>
  );
}

const ShoppingCart = styled.div`
  display: flex;
  z-index: 1000;
`;

const ShoppingCartContainer = styled.div`
  z-index: 1000;

  .menu {
    position: absolute;
    width: 400px;
    min-height: 100px;
    background-color: #ffffff;
    right: 0px;
    top: 0;
    border: 1px solid ${({ theme }) => theme.border};
    transition: 0.6s all ease-in-out;
    border-radius: 0 0 10px 10px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.4s;
    padding: 5px;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-right: 5px;
  }

  .title__cart {
    text-align: center;
    font-size: 20px;
  }

  .info__carro {
    /* display: flex; */
    width: 100%;
    flex-direction: column;
  }

  .info__carta {
    width: 95%;
  }

  .info__total {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.primary};
  }

  .total {
    margin-left: 5px;
  }

  .total__price {
    display: flex;
  }

  .comprar__cart {
    padding: 5px;
    border: 1px solid transparent;
    transition: 0.4s;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border: 1px solid ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.light};
    }
  }

  @media screen and (max-width: 500px) {
    .menu {
      width: 100%;
    }
  }
`;
