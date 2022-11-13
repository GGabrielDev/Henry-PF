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
  error: {code: number | null,
          message: string | null}
}

export const initialState: SliceState = {
  products: [],
  productsAll: [],
  details: {},
  search: [],
  error: {
    code: null,
    message: null,
  },
};

export const createProduct = createAsyncThunk("product/createProduct" , async (product: ProductType) => {
  const res = await axios.post(`http://localhost:3001/products`,{product})
  return res.data
})

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

const editProduct = createAsyncThunk("product/editProduct", async (product: ProductType) => {
  const { id, ...rest } = product;
  const res = await axios.put(`http://localhost:3001/products/${product.id}`,{
    ...rest
  })
  return res.data
  });

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
          state.error = {code: null, message:null}
        }
      )
      .addCase(
        getProductId.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.details = action.payload;
          state.error = {code: null, message:null}
        }
      )
      .addCase(
        searchProduct.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.productsAll = action.payload || [];
          state.error = {code: null, message:null}
        }
      )
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.products.forEach((product, index) => {
            if(product.id === action.payload.id){
              state.products[index] = action.payload;
              state.error = {code: null, message:null}
            }
          })
        }
      )
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.products = [...state.products, action.payload]
          state.error = {code: null, message:null}
        }
      )
      .addCase(
        getProducts.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 404,
            message: "An error ocurred while getting all the products"
          }
        }
      )
      .addCase(
        editProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 404,
            message: "An error ocurred when editing the product"
          }
        }
      )
      .addCase(
        searchProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 404,
            message: "An error ocurred while searching for the product"
          }
        }
      )
      .addCase(
        getProductId.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 404,
            message: "An error ocurred while searching the product through its Id"
          }
        }
      )
      .addCase(
        createProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 400,
            message: "An error ocurred while creating the product"
          }
        }
      )
  },
});

export const { filterAsc } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.productsAll;
export const selectFilterProducts = (state: RootState) =>
  state.products.products;
export const detailProduct = (state: RootState) => state.products.details;

export default productSlice.reducer;
