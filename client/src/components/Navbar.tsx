import React from "react";
import styled from "styled-components";
import { BiUser, BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Header>
        <Headertop>
          <Infotop>
            <div className="infotop-item">Client service</div>
            <div className="infotop-item">FAQ</div>
            <div className="infotop-item">About</div>
            <div className="infotop-item">Eng</div>
          </Infotop>
        </Headertop>
        <Headermiddle>
          <Link to="/">
            <Logo>PedirYa</Logo>
          </Link>

          <Userinfo>
            <div className="userinfo-item userinfo-text">Mans</div>
            <div className="userinfo-item userinfo-text">Womans</div>
            <div className="userinfo-item">
              {/* <Link to="/usuario/general">
                <BiUser className="icono__user" />
              </Link> */}

              <Link to="/auth/login">
                <button className="button__login">INICIAR SESIÓN</button>
              </Link>
            </div>

            <div className="userinfo-item">
              <button>
                <BiShoppingBag /> Cart(0)
              </button>
            </div>
          </Userinfo>
        </Headermiddle>
        <Headerbottom>
          <Infocategories>
            <div className="infocategories-item">Top</div>
            <div className="infocategories-item">Bottom</div>
            <div className="infocategories-item">Watch</div>
            <div className="infocategories-item">Shoes</div>
            <div className="infocategories-item">Bag</div>
            <div className="infocategories-item">Sports</div>
          </Infocategories>
        </Headerbottom>
      </Header>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  width: 100%;

  .userinfo-item {
    cursor: pointer;
  }

  .userinfo-item button {
    svg {
      color: white;
    }
  }

  .userinfo-text {
    font-weight: 400;
    color: gray;
  }

  .infocategories-item {
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
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
  width: 230px;
  margin-right: 50px;

  .infotop-item {
    font-size: 12px;
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
