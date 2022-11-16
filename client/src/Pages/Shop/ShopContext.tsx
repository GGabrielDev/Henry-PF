import { ReactElement, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Themes1, Themes2, Themes3 } from "../../components/Shops/Themes";
import {
  selectors,
  actions,
  SellerType,
} from "../../features/seller/sellerSlice";

const { getSellerByName } = actions;
const { selectSeller, selectError } = selectors;

export default function ShopContext(): ReactElement {
  const { shopName } = useParams<{ shopName: string }>();
  const [validShop, setValidShop] = useState("Loading");
  const seller = useAppSelector(selectSeller);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shopName !== "" && shopName !== undefined) {
      if (!seller.id && error.message !== "Seller not found") {
        dispatch(getSellerByName(shopName));
      } else {
        if (error.message === "Seller not found") {
          setValidShop("Seller does not exist");
        } else {
          if (
            seller.categorias &&
            seller.description &&
            seller.imageLogo &&
            seller.nombreNegocio &&
            seller.template_page
          ) {
            setValidShop(!seller.suspended ? "Active" : "Suspended");
          } else {
            setValidShop("Incompleted");
          }
        }
      }
    } else {
      setValidShop("No Shop Name");
    }
  }, [shopName, seller, error]);

  const switchTheme = () => {
    switch(seller.template_page){
      case "1":
        return Themes1
      case "2":
        return Themes2
      case "3":
        return Themes3
  }}

  const contextSwitch = () => {
    switch (validShop) {
      case "Loading":
        return <p>Loading Component</p>;
      case "Seller does not exist":
        return <p>Seller doesn't exists Component</p>;
      case "No Name Shop":
        return <p>No Route Component</p>;
      case "Incompleted":
        return <p>Incompleted Seller Component</p>;
      case "Suspended":
        return <p>Suspended Seller Component</p>;
      case "Active":
        return(
          <ThemeProvider theme = { switchTheme() }><Outlet/> </ThemeProvider>
        )
    }
  };

  return <>{contextSwitch()}</>;
}
