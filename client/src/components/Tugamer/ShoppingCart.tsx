import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "../../features/products/productSlice";
import { CartItem } from "./CartItem";
import { useShoppingCart } from "./context/SoppingCartContext";
import { AiOutlineArrowLeft } from "react-icons/ai";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function SoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const item = useAppSelector(selectProducts);

  return (
    <>
      {isOpen ? (
        <ShoppingCart>
          <ShoppingCartContainer>
            <div className="menu">
              <div className="content" onClick={closeCart}>
                <span className="close">
                  <AiOutlineArrowLeft />
                </span>
                <h1 className="title__cart">Cart</h1>
              </div>
              <div className="info__carro">
                {cartItems.map((item) => (
                  <div className="info__carta">
                    <CartItem key={item.id} {...item} />
                  </div>
                ))}
              </div>
              <div className="info__total">
                <div>Total:</div>
                <div className="total">
                  {cartItems.reduce((total, cartItem) => {
                    const itemFind = item.find((e) => e.id === cartItem.id);
                    return (
                      total + (itemFind?.price_local || 0) * cartItem.quantity
                    );
                  }, 0)}
                </div>
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
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .info__carta {
    width: 95%;
  }

  .info__total {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.primary};
  }

  .total {
    margin-left: 10px;
  }

  @media screen and (max-width: 500px) {
    .menu {
      width: 100%;
    }
  }
`;
