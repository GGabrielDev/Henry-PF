import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import backAxios from "../../helpers/Axios";
import { UserType } from "../users/userSlice";

export type CategoryType = {
  id: string;
  name: string;
};

export type BaseProductType = {
  name: string;
  stock: number;
  price_local: number;
  description: string;
  image: string | undefined;
  suspended: boolean;
  categories: any[];
  sellerId: string | null;
};
export type ProductType = BaseProductType & {
  id: string;
  price_dolar: number | null | undefined;
  size: string | null | undefined;
};

export type ReviewType = {
  id: string;
  body: string;
  score: number;
  user: UserType;
};

export type ProductDetail = ProductType & {
  reviews: ReviewType[];
};

export interface SliceState {
  products: ProductType[];
  productsAll: ProductType[];
  details: ProductDetail;
  search: ProductType[];
  error: { code: number | null; message: string | null };
}

export const initialState: SliceState = {
  products: [],
  productsAll: [],
  details: {
    id: "",
    name: "",
    stock: 0,
    price_local: 0,
    description: "",
    price_dolar: null,
    image: undefined,
    suspended: false,
    size: null,
    categories: [],
    reviews: [],
    sellerId: "",
  },
  search: [],
  error: {
    code: null,
    message: null,
  },
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product: BaseProductType) => {
    const res = await backAxios.post(`/products`, {
      product,
    });
    return res.data;
  }
);

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const res = await backAxios.get("/products");

    return res.data.result;
  } catch (error) {
    console.log(error);
  }
});

export const getProductsBySellerId = createAsyncThunk(
  "product/getProductsBySellerId",
  async (sellerId: string) => {
    try {
      const res = await backAxios.get(`/products/shops/${sellerId}`);

      return res.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductId = createAsyncThunk(
  "product/getProductId",
  async (productId: string | undefined) => {
    try {
      const res = await backAxios.get(`/products/${productId}`);

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
      const res = await backAxios.get(`/products?name=${name}`);
      return res.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (product: ProductType) => {
    const { id, ...rest } = product;
    const res = await backAxios.put(`/products/${product.id}`, {
      ...rest,
    });
    return res.data;
  }
);

export const createReview = createAsyncThunk(
  "product/createReview",
  async ({
    userId,
    productId,
    review,
  }: Record<"userId" | "productId", string> & {
    review: Partial<ReviewType>;
  }) => {
    const res = await backAxios.post("/reviews", review, {
      params: {
        userId,
        productId,
      },
    });
    return res.data;
  }
);

export const editReview = createAsyncThunk(
  "product/editReview",
  async (review: Partial<ReviewType>) => {
    const res = await backAxios.put(`/reviews/${review.id}`, review);
    return res.data;
  }
);

export const createProductBySellerId = createAsyncThunk(
  "product/createProductBySellerId",
  async (product: BaseProductType & { sellerId: string }) => {
    const { sellerId, ...rest } = product;
    const res = await backAxios.post(`/products/${sellerId}`, {
      ...rest,
    });
    return res.data;
  }
);

export const createCategory = createAsyncThunk(
  "productCategory/Categories",
  async ({ category, id }: { category: Partial<CategoryType>; id: string }) => {
    const res = await backAxios.post(`/productCategory/${id}`, category);
    return res.data;
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
          state.error = { code: null, message: null };
        }
      )
      .addCase(
        getProductId.fulfilled,
        (state, action: PayloadAction<ProductDetail>) => {
          state.details = action.payload;
          state.error = { code: null, message: null };
        }
      )
      .addCase(
        searchProduct.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.productsAll = action.payload || [];
          state.error = { code: null, message: null };
        }
      )
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.products.forEach((product, index) => {
            if (product.id === action.payload.id) {
              state.products[index] = action.payload;
              state.error = { code: null, message: null };
            }
          });
        }
      )
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.products = [...state.products, action.payload];
          state.error = { code: null, message: null };
        }
      )
      .addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "An error ocurred while getting all the products",
        };
      })
      .addCase(editProduct.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "An error ocurred when editing the product",
        };
      })
      .addCase(searchProduct.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "An error ocurred while searching for the product",
        };
      })
      .addCase(getProductId.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message:
            "An error ocurred while searching the product through its Id",
        };
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 400,
          message: "An error ocurred while creating the product",
        };
      })
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<ReviewType>) => {
          state.details.reviews = [action.payload, ...state.details.reviews];
        }
      )
      .addCase(
        editReview.fulfilled,
        (state, action: PayloadAction<ReviewType>) => {
          const newArray = [...state.details.reviews];
          const reviewIndex = state.details.reviews.findIndex(
            (review) => review.id === action.payload.id
          );
          newArray.splice(reviewIndex, 1);
          state.details.reviews = [action.payload, ...newArray];
        }
      )
      .addCase(
        getProductsBySellerId.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.products = action.payload || [];
          state.productsAll = action.payload || [];
          state.error = { code: null, message: null };
        }
      )
      .addCase(
        getProductsBySellerId.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 500,
            message:
              "An error ocurred while getting the products associated to the shop",
          };
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
