import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stringify } from "querystring";
import { RootState } from "../../app/store";



export type SellerType = BaseSellerType & {
  id: number;
};

export type BaseSellerType = {
nombreNegocio: string;
imageLogo: string | null;
categorias: "Gastronomia" | "Entretenimiento" | "Servicios" | "Tecnologia" | "Vestimenta" | "Educacion" | "No esta especificado"|null;
template_page: "1"|"2"|"3"|null;
}

type SliceState = {
  user: SellerType | {};
  error: {
    code: number | null
    message: string | null
  }
}

const initialState: SliceState = {
  user: {},
  error: {
    code: null,
    message: null
  }
}

const getSellerByName = createAsyncThunk("seller/getSellerByName", async (nombreNegocio: string) => {
  const res = await axios.get(`http://localhost:3001/sellers/${nombreNegocio}`)
  return res.data
})

const getSellerById = createAsyncThunk("seller/getSellerById", async (id: number) => {
    const res = await axios.get(`http://localhost:3001/sellers/${id}`)
    return res.data
  })

const createSeller = createAsyncThunk("seller/createSeller", async (seller: BaseSellerType) => {
  const res = await axios.post(`http://localhost:3001/sellers`, seller)
  return res.data
})

const editSeller = createAsyncThunk("seller/editSeller", async (seller: SellerType) => {
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
          state.user = action.payload
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
          state.user = action.payload
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
        state.user = action.payload
      }
    )
    .addCase(
        createSeller.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "Hubo un error al crear el usuario"
        }
      }
    )
    .addCase(
        editSeller.fulfilled,
      (state, action: PayloadAction<SellerType>) => {
        state.user = action.payload
      }
    )
    .addCase(
        editSeller.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "Hubo un error al editar el usuario"
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