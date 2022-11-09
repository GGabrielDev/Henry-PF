import styled from "styled-components";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import Swal from "sweetalert2";
import { ProductType } from "../../features/products/productSlice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { deleteProduct } from "../../redux/actions";

//NECESITAMOS Q LA IMAGEN SEA 320x285 hasta hacer la card responsive
const Card = ({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();

  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Producto eliminado",
      text: "Has eliminado el producto de manera exitosa",
      icon: "success",
      confirmButtonText: "Perfecto",
    });
    dispatch(deleteProduct(product.id));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <CardContainer>
      <ThemeProvider theme={ThemesLanding}>
        <div className="card__container">
          <div className="edit__container">
            <span className="delete" onClick={AlertaCorrecta}>
              <AiOutlineClose />
            </span>
            <Link to={`/usuario/editar/producto/${product.id}`}>
              <span className="edit">
                <AiFillEdit />
              </span>
            </Link>
          </div>
          <div className="card__image">
            <img src={product.image} alt="" />
          </div>
          <div className="card__info">
            <div className="card_color_name">{product.name}</div>
            <div className="card__name__price">
              <h2 className="card_color_price">{product.price_local}</h2>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </CardContainer>
  );
};

export default Card;
const CardContainer = styled.div`
  border-radius: 10px;
  margin: 15px;
  background-color: ${({ theme }) => theme.white};
  width: 200px;

  .div__comprar {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info {
    font-size: 15px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    justify-content: space-evenly;
    transition: 0.3s;
    &:hover {
      box-shadow: 2px 2px 15px #3030304c;
    }
  }

  .edit__container {
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 5px;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.4s;
      color: ${({ theme }) => theme.border};
      cursor: pointer;
      padding: 0 5px;
    }
    .edit {
      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }
    .delete {
      &:hover {
        color: ${({ theme }) => theme.error};
      }
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
    overflow: hidden;
    width: 180px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-bottom: 10px;
    img {
      display: flex;
      align-items: center;
      justify-content: center;
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
    padding-right: 10px;
    gap: 15px;
  }

  .card__name__price {
    display: flex;
    font-size: 12px;
    justify-content: center;
    margin-bottom: 10px;
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
    text-align: center;
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
    border-radius: 7px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.4s;
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
