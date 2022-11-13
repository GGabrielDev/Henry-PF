import styled from "styled-components";
import { BiUser, BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions, selectors } from "../../features/cart/cartSlice";
import ShoppingCart from "./ShoppingCart";
import { selectProducts } from "../../features/products/productSlice";

const { toggleCart } = actions;
const { selectCartQuantity, selectIsOpen } = selectors;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuantity);
  const isOpen = useAppSelector(selectIsOpen);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const categorias = useAppSelector(selectProducts);

  return (
    <NavbarContainer>
      <ShoppingCart isOpen={isOpen} />
      <Header>
        <Headertop>
          <Infotop>
            <div className="infotop-item">
              {isAuthenticated ? (
                <div className="is" onClick={() => logout()}>
                  {" "}
                  Salir de sesión{" "}
                </div>
              ) : (
                <div className="is" onClick={() => loginWithRedirect()}>
                  {" "}
                  Iniciar sesion{" "}
                </div>
              )}
            </div>
            <div className="infotop-item">Client service</div>
            <div className="infotop-item">FAQ</div>
            <div className="infotop-item">About</div>
          </Infotop>
        </Headertop>
        <Headermiddle>
          <Link to="/tugamer">
            <Logo>TuGamer</Logo>
          </Link>

          <Userinfo>
            <div className="userinfo-item userinfo-text">Notebooks</div>
            <div className="userinfo-item userinfo-text">Cpu</div>
            <div className="userinfo-item">
              {/* <Link to="/usuario/general">
                <BiUser className="icono__user" />
              </Link> */}
            </div>

            <div className="userinfo-item">
              <button
                className="button__cart"
                onClick={() => dispatch(toggleCart())}
              >
                <BiShoppingBag /> {cartQuantity}
              </button>
            </div>
          </Userinfo>
        </Headermiddle>
        <Headerbottom>
          <Infocategories>
            {categorias
              ? categorias.map((e) => {
                  return <div>{e.categories}</div>;
                })
              : null}
          </Infocategories>
        </Headerbottom>
      </Header>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  width: 100%;

  position: relative;

  .userinfo-item {
    cursor: pointer;
  }

  .userinfo-item button {
    svg {
      color: ${({ theme }) => theme.light};
    }
  }

  .userinfo-text {
    font-weight: 400;
    color: ${({ theme }) => theme.details};
    transition: 0.5s;
    &:hover {
      text-decoration: underline;
    }
  }

  .infocategories-item {
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media screen and (max-width: 1000px) {
    .userinfo-text {
      display: none;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  position: absolute;
  z-index: 10;
`;

const Headertop = styled.div`
  height: 30px;
  display: flex;
  justify-content: end;
  align-items: center;
  border-bottom: 1.3px solid #f0f0f0;

  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;

const Infotop = styled.div`
  display: flex;
  justify-content: space-around;
  width: 310px;
  margin-right: 50px;

  .infotop-item {
    font-size: 12px;
  }

  .button__cart {
    position: relative;
  }

  .infotop-item-ini {
    color: ${({ theme }) => theme.dark};
  }
  .is {
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

const Headermiddle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  border-bottom: 1.3px solid #f0f0f0;

  @media screen and (max-width: 1000px) {
    padding: 0 20px;
  }
`;

export const Logo = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  @media screen and (max-width: 1000px) {
    width: auto;
    justify-content: start;
    font-size: 30px;
  }
`;

const Userinfo = styled.div`
  width: 400px;
  height: 60px;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: space-between;

  button {
    border-radius: 7px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border: 1px solid transparent;
    padding: 7px 10px;
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

  svg {
    font-size: 30px;
  }
  svg {
    font-size: 30px;
    text-decoration: none;
    color: ${({ theme }) => theme.dark};
  }

  @media screen and (max-width: 1000px) {
    width: 150px;
  }
  @media screen and (max-width: 350px) {
    width: 130px;
  }
`;

const Headerbottom = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  @media screen and (max-width: 1000px) {
    justify-content: center;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Infocategories = styled.div`
  margin-left: 100px;
  display: flex;
  width: 400px;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    margin: 0;
  }
`;
