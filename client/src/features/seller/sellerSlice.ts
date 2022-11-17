import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import backAxios from "../../helpers/Axios";
import { RootState } from "../../app/store";

export type SellerType = BaseSellerType & {
  id: string | null;
  suspended: boolean;
  paymentId: string | null;
};

export type BaseSellerType = {
  nombreUrl: string | null;
  nombreNegocio: string | null;
  imageLogo: string | null;
  categorias:
    | "Gastronomia"
    | "Entretenimiento"
    | "Servicios"
    | "Tecnologia"
    | "Vestimenta"
    | "Educacion"
    | "No esta especificado"
    | null;
  template_page: "1" | "2" | "3" | null;
  description: string | null;
};

type SliceState = {
  seller: SellerType;
  error: {
    code: number | null;
    message: string | null;
  };
};

const clearSellerObject: SellerType = {
  id: null,
  nombreUrl: null,
  nombreNegocio: null,
  imageLogo: null,
  categorias: null,
  template_page: null,
  paymentId: null,
  suspended: false,
  description: null,
};

const initialState: SliceState = {
  seller: clearSellerObject,
  error: {
    code: null,
    message: null,
  },
};

export const getSellerByName = createAsyncThunk(
  "seller/getSellerByName",
  async (nombreNegocio: string) => {
    const res = await backAxios.get(`/sellers/shop/${nombreNegocio}`);
    return res.data;
  }
);

export const getSellerById = createAsyncThunk(
  "seller/getSellerById",
  async (id: string) => {
    const res = await backAxios.get(`/sellers/${id}`);
    return res.data;
  }
);

export const createSeller = createAsyncThunk(
  "seller/createSeller",
  async (seller: BaseSellerType) => {
    const res = await backAxios.post(`/sellers`, seller);
    return res.data;
  }
);

export const getSellers = createAsyncThunk(
  "seller/sellers",
  async (seller: SellerType) => {
    const res = await backAxios.get(`/sellers`);
    return res.data;
  }
);

export const editSeller = createAsyncThunk(
  "seller/editSeller",
  async ({ seller, id }: { seller: Partial<SellerType>; id: string }) => {
    const res = await backAxios.put(`/sellers/${id}`, {
      ...seller,
    });
    return res.data;
  }
);

export const getSellerByEmail = createAsyncThunk(
  "seller/getSellerByEmail",
  async (sellerId: string & { email: string }) => {
    const res = await backAxios.get(`/sellers/${sellerId}`);
    return res.data;
  }
);

export const getCategories = createAsyncThunk("seller/getCategories", async (sellerId: string, ) => {
  const res = await backAxios.get(`/sellers/categories`)
  return res.data
})

export const userSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    clearSeller: (state) => {
      state.seller = clearSellerObject;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSellerByName.fulfilled,
        (state, action: PayloadAction<SellerType>) => {
          state.seller = action.payload;
          state.error = { code: null, message: null };
        }
      )
      .addCase(
        getSellerByName.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = {
            code: 404,
            message: "Seller not found",
          };
        }
      )
      .addCase(
        getSellerById.fulfilled,
        (state, action: PayloadAction<SellerType>) => {
          state.seller = action.payload;
          state.error = { code: null, message: null };
        }
      )
      .addCase(getSellerById.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "User not found",
        };
      })

      .addCase(
        createSeller.fulfilled,
        (state, action: PayloadAction<SellerType>) => {
          state.seller = action.payload;
          state.error = { code: null, message: null };
        }
      )
      .addCase(createSeller.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "An error ocurred while creating the seller",
        };
      })
      .addCase(
        editSeller.fulfilled,
        (state, action: PayloadAction<SellerType>) => {
          state.seller = action.payload;
          state.error = { code: null, message: null };
        }
      )
      .addCase(editSeller.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "An error ocurred while editing the seller",
        };
      });
  },
});

const selectError = (state: RootState) => state.seller.error;
const selectSeller = (state: RootState) => state.seller.seller;
const { clearSeller } = userSlice.actions;

export const selectors = { selectError, selectSeller };
export const actions = {
  getSellerByName,
  getSellerById,
  editSeller,
  createSeller,
  clearSeller,
};
export const helpers = {};

export default userSlice.reducer;
