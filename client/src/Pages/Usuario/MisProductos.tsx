import React from "react";
import MenuUsuario from "./MenuUsuario";
import styled from "styled-components";
import Perfil from "../../assets/imagenesSlider/profile.png";
import Paisaje from "../../assets/imagenesSlider/49838.jpg";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProductsSeller,
  selectProducts,
} from "../../features/products/productSlice";
import Card from "./Card";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import {getSellerById, SellerType, selectors as sellerSelectors, editSeller } from "../../features/seller/sellerSlice";
import { selectors as userSelectors, actions as userActions, getUserByEmail, UserType} from "../../features/users/userSlice";

const { selectSeller } = sellerSelectors;
const { selectUser } = userSelectors;

const General = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const seller = useAppSelector(selectSeller) as SellerType
  const user = useAppSelector(selectUser) as UserType
  useEffect(() => {
  
    if(!seller.id){      
      dispatch(getSellerById(user.sellerId as string));     
    } else {
      dispatch(getProductsSeller(seller.id))
    }
  }, [user, seller.id])

  return (
    <GeneralContainer>
      <ThemeProvider theme={ThemesLanding}>
        <MenuUsuario />
        <GeneralContent>
          <h1 className="general__perfil-title">Tus Productos</h1>
          <div className="grid__productos">
            {products?.map((e: any) => {
              return (
                <div className="gridcard" key={e.id}>
                  <Card product={e} />
                </div>
              );
            })}
          </div>
        </GeneralContent>
      </ThemeProvider>
    </GeneralContainer>
  );
};

export default General;

const GeneralContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

const GeneralContent = styled.div`
  width: 100%;

  .general__perfil-title {
    text-align: center;
    border-left: 1px solid ${({ theme }) => theme.border};
  }

  .grid__productos {
    border-left: 1px solid ${({ theme }) => theme.border};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .gridcard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 940px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 725px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 650px) {
    .grid__productos {
      justify-content: center;
    }
  }
  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
    overflow: auto;
  }
`;
