import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProductsBySellerId,
  getProducts,
  selectProducts,
} from "../../features/products/productSlice";
import Card from "../Shops/Card";
import { selectors } from "../../features/seller/sellerSlice";

const { selectSeller } = selectors;

export default function Cards() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const seller = useAppSelector(selectSeller);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <DivCards>
        {products?.map((e: any) => {
          return (
            <div className="gridcard" key={e.id}>
              <Card product={e} />
            </div>
          );
        })}
      </DivCards>
    </>
  );
}
const DivCards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: auto;

  @media screen and (max-width: 940px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 725px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 475px) {
    grid-template-columns: repeat(4, 1fr);
    overflow: auto;
  }
  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
    overflow: auto;
  }

  .gridcard {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* display:flex;
    justify-content: space-around;
    flex-wrap: wrap; */
`;
