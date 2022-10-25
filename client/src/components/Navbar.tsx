import React from "react";
import styled from "styled-components";
import { Themes } from "./Theme/Theme";
import {BiUser,BiShoppingBag} from "react-icons/bi"

const Navbar = () => {
  return (
    <NavbarContainer>
      <div className="Header">
        <div className="Headertop">
          <div className="infotop">
            <div className="infotop-item">
              Client service
            </div>
            <div className="infotop-item">
              FAQ
            </div>
            <div className="infotop-item">
              About
            </div>
            <div className="infotop-item">
              Eng
            </div>
          </div>
        </div>
        <div className="Headermiddle">
          <div className="logo">PedirYa</div>
          <div className="userinfo">
            <div className="userinfo-item userinfo-text">
              Mans
            </div>
            <div className="userinfo-item userinfo-text">
              Womans
            </div>
            <div className="userinfo-item">
              <BiUser/>
            </div>
            <div className="userinfo-item">
              <button><BiShoppingBag/> Cart(0)</button>
            </div>

          </div>
        </div>
        <div className="Hederbottom">
          <div className="infocategories">
            <div className="infocategories-item">Top</div>
            <div className="infocategories-item">Bottom</div>
            <div className="infocategories-item">Watch</div>
            <div className="infocategories-item">Shoes</div>
            <div className="infocategories-item">Bag</div>
            <div className="infocategories-item">Sports</div>
          </div>
        </div>

      </div>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  width: 100%;

  .Header{
    width: 100%;
    position: absolute;

  }

  .Headertop{
    height: 30px;
    display: flex;
    justify-content: end;
    align-items: center;
    border-bottom: 1.3px solid #f0f0f0;
  }

  .infotop{
    display: flex;
    justify-content: space-around;
    width: 230px;
    margin-right: 50px;
  }

  .infotop-item{
    font-size: 12px;
  }

  .Headermiddle{
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
    border-bottom: 1.3px solid #f0f0f0;

  }

  .logo{
    width: 200px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 700;
    color: #8400ff;
  }

  .userinfo{
    width: 400px;
    height: 60px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: space-between;

    button{
      border-radius: 7px;
      background-color: #8400ff;
      color: white;
      border: none;
      padding: 7px 10px;
      display: flex;
      align-items: center;
      cursor: pointer;

      svg{
        font-size: 20px;
        margin-right: 5px;
      }
    }

    svg{
      font-size: 30px;
    }
  }

  .userinfo-item{
    cursor: pointer;
  }

  .Hederbottom{
    display: flex;
    align-items: center;
    height: 40px;
  }

  .infocategories{
    margin-left: 100px;
    display: flex;
    width: 400px;
    justify-content: space-between;
  }

  .infocategories-item{
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  }

  @media screen and (max-width:1000px){

    .logo{
      width: auto;
      justify-content: start;
      font-size: 30px;
    }

    .Headermiddle{
      padding: 0 20px;
    }
    .userinfo-text{
      display: none;
    }

    .userinfo{
      width: 150px;
    }

    .Hederbottom{
      justify-content: center;
    }

    .infocategories{
      margin: 0;
    }
    
  }

  @media screen and (max-width:500px){
    .Hederbottom{
      display: none;
    }
    .Headertop{
      justify-content: center;
    }
    .infotop{
      margin: 0;
    }
  }
  @media screen and (max-width:350px){
    .Hederbottom{
      display: none;
    }

    .userinfo{
      width: 130px;
    }
  }

`;
