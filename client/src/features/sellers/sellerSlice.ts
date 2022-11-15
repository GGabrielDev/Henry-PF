import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stringify } from "querystring";
import { RootState } from "../../app/store";



export type SellerType = BaseSellerType & {
  id: number;
};

export type BaseSellerType = {
nombreNegocio: string | null;
imageLogo: string | null;
categorias: "Gastronomia" | "Entretenimiento" | "Servicios" | "Tecnologia" | "Vestimenta" | "Educacion" | "No esta especificado"|null;
template_page: "1"|"2"|"3"|null;
paymentId:string | null;
description: string | null;

}

type SliceState = {
  seller: SellerType | {};
  error: {
    code: number | null
    message: string | null
  }
}

const initialState: SliceState = {
  seller: {},
  error: {
    code: null,
    message: null
  }
}

export const getSellerByName = createAsyncThunk("seller/getSellerByName", async (nombreNegocio: string) => {
  const res = await axios.get(`http://localhost:3001/sellers/${nombreNegocio}`)
  return res.data
})

export const getSellerById = createAsyncThunk("seller/getSellerById", async (id: number) => {
    const res = await axios.get(`http://localhost:3001/sellers/${id}`)
    return res.data
  })

export const createSeller = createAsyncThunk("seller/createSeller", async (seller: BaseSellerType) => {
  const res = await axios.post(`http://localhost:3001/sellers`, seller)
  return res.data
})

export const editSeller = createAsyncThunk("seller/editSeller", async (seller: SellerType) => {
  const { id,  ...rest } = seller;
  const res = await axios.put(`http://localhost:3001/sellers/${id}`, {
    ...rest
  })
  return res.data
})

export const userSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {

  }, extraReducers: (builder) => {
    builder
      .addCase(
        getSellerByName.fulfilled,
        (state, action: PayloadAction<SellerType>) => {
          state.seller = action.payload
          state.error = {code: null, message:null}
        }
      )
    .addCase(
        getSellerByName.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "User not found"
        }
      }
    )
    .addCase(
        getSellerById.fulfilled,
        (state, action: PayloadAction<SellerType>) => {
          state.seller = action.payload
          state.error = {code: null, message:null}
        }
      )
    .addCase(
        getSellerById.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "User not found"
        }
      }
    )

    .addCase(
        createSeller.fulfilled,
      (state, action: PayloadAction<SellerType>) => {
        state.seller = action.payload
        state.error = {code: null, message:null}
      }
    )
    .addCase(
        createSeller.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "An error ocurred while creating the seller"
        }
      }
    )
    .addCase(
        editSeller.fulfilled,
      (state, action: PayloadAction<SellerType>) => {
        state.seller = action.payload
        state.error = {code: null, message:null}
      }
    )
    .addCase(
        editSeller.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "An error ocurred while editing the seller"
        }
      }
    )
  }
});

const selectError = (state: RootState) => state.user.error
const selectUser = (state: RootState) => state.user.user
const {

} = userSlice.actions;

export const selectors = { selectError, selectUser};
export const actions = {
  getSellerByName, getSellerById, editSeller, createSeller
};
export const helpers = {};

export default userSlice.reducer;