import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

export type ProductType = {
  id: string;
  name: string;
  stock: number;
  price_local: number;
  description: string;
  price_dolar: number | null | undefined;
  image: string | undefined;
  suspended: boolean;
  size: string | null | undefined;
  categories:string;
};

export type ReviewType = {
  id: string;
  body: string;
  score: number;
  user: {
    username: string;
    imagenDePerfil: string;
  };
};

export type ProductDetail = ProductType & {
  reviews: ReviewType[];
};

export interface SliceState {
  products: ProductType[];
  productsAll: ProductType[];
  details: ProductDetail | {};
  search: ProductType[];
}

export const initialState: SliceState = {
  products: [],
  productsAll: [],
  details: {},
  search: [],
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const res = await axios.get("http://localhost:3001/products");

    return res.data.result;
  } catch (error) {
    console.log(error);
  }
});
export const getProductId = createAsyncThunk(
  "product/getProductId",
  async (productId: string | undefined) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/products/${productId}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (name: string | undefined) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/products?name=${name}`
      );
      console.log(res.data);
      return res.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterAsc: (state, action: PayloadAction<string>) => {
      const allproducts = state.productsAll;
      const ordenamiento =
        action.payload === "asc"
          ? allproducts.sort(function (a, b) {
              return a.price_local - b.price_local;
            })
          : action.payload === "des"
          ? allproducts.sort(function (a, b) {
              return b.price_local - a.price_local;
            })
          : state.productsAll;
      state.products = ordenamiento;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.products = action.payload || [];
          state.productsAll = action.payload || [];
        }
      )
      .addCase(
        getProductId.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.details = action.payload;
        }
      )
      .addCase(
        searchProduct.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.productsAll = action.payload || [];
        }
      );
  },
});

export const { filterAsc } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.productsAll;
export const selectFilterProducts = (state: RootState) =>
  state.products.products;
export const detailProduct = (state: RootState) => state.products.details;

export default productSlice.reducer;
