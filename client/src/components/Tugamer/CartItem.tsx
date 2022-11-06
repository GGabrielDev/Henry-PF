import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "../../features/products/productSlice";
import { useShoppingCart } from "./context/SoppingCartContext";
import image from "../../assets/imagenesSlider/49838.jpg";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

type CartItemProps = {
  id: string;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = useAppSelector(selectProducts);
  const itemFind = item.find((e) => e.id === id);
  if (itemFind == null) return null;

  return (
    <CardContainer>
      <div className="img__container">
        <img src={image} alt={image} />
      </div>
      <div className="">
        {itemFind.name}
        <div className="combinado">
          <div>{itemFind.price_local}</div>
          <div className="cantidad">
            {quantity > 1 && <span>x {quantity}</span>}
          </div>
        </div>
        <div>Sub total: {itemFind.price_local * quantity}</div>
      </div>
      <button
        className="button__remover"
        onClick={() => removeFromCart(itemFind.id)}
      >
        <span className="delete">
          <IoMdClose />
        </span>
      </button>
    </CardContainer>
  );
}

function formatCurrency(price_local: number): import("react").ReactNode {
  throw new Error("Function not implemented.");
}

const CardContainer = styled.div`
  margin: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .img__container {
    padding: 5px;
    width: 150px;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      border-radius: 10px;
      width: 100%;
    }
  }
  .button__remover {
    padding: 5px;
    height: fit-content;
    border: 1px solid transparent;
    transition: 0.4s;
    background-color: ${({ theme }) => theme.error};
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.light};
      border: 1px solid ${({ theme }) => theme.error};
      color: ${({ theme }) => theme.error};
    }
  }
  .combinado {
    display: flex;
  }
  .cantidad {
    margin-left: 10px;
  }
  .delete {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
