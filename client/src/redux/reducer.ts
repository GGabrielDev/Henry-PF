import { ProductType } from "../features/products/productSlice";
import { GET_PRODUCTS, FILTER_PRICE } from "./actions";
export interface Action {
  type: string;
  payload: any;
}

import { PAY } from "./variables";

const initialState = {
  loggedIn: false,
  products: [],
  productsAll: [],
};
export function reducers(state = initialState, action: Action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...action.payload,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        loggedIn: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsAll: action.payload,
      };
    case FILTER_PRICE:
      const allproducts = state.products;
      const ordenamiento =
        action.payload === "asc"
          ? allproducts.sort(function (a: ProductType, b: ProductType) {
              if (a.price_local > b.price_local) {
                return 1;
              } else if (b.price_local > a.price_local) {
                return -1;
              }
              return 0;
            })
          : action.payload === "des"
          ? allproducts.sort(function (a: ProductType, b: ProductType) {
              if (a.price_local > b.price_local) {
                return -1;
              }
              if (b.price_local > a.price_local) {
                return 1;
              }
              return 0;
            })
          : state.productsAll;
      return {
        ...state,
        products: ordenamiento,
      };
    case PAY: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
