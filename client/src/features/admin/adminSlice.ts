import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { User } from "@auth0/auth0-react";

export type UserType = {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  isPremium: boolean;
  suspended: boolean;
  gender: "M" | "F" | "No binario" | "Prefiero no decirlo" | null;
  imagenDePerfil: string | null;
  address: string | null;
  createdAt: Date | null;
  deletedAt: Date | null;
  updatedAt: Date | null;
  countryId: number | null;
  sellerId: string | null;
  seller?: SellerType;
};

export type SellerType = {
  id: string;
  nombreNegocio: string | null;
  imagenLogo: string | null;
  categorias:
    | "Gastronomia"
    | "Entretenimiento"
    | "Servicios"
    | "Tecnologia"
    | "Vestimenta"
    | "Educacion"
    | "No esta especificado";
  template_page: "1" | "2" | "3";
  suspended: boolean;
  paymentId: string | null;
  description: string | null;
  createdAt: Date | null;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

type SliceState = {
  users: UserType[];
  sellers: SellerType[];
  error: {
    code: number | null;
    message: string | null;
  };
};

const initialState: SliceState = {
  users: [],
  sellers: [],
  error: {
    code: null,
    message: null,
  },
};

const getUsers = createAsyncThunk("admin/getUsers", async () => {
  const res = await axios.get(`http://localhost:3001/users`);
  return res.data;
});

const crearVendedor = createAsyncThunk(
  "admin/crearVendedor",
  async (userId: string) => {
    const res = await axios.post(`http://localhost:3001/sellers/${userId}`);
    return res.data;
  }
);

export const deleteSeller = createAsyncThunk(
  "admin/deleteSeller",
  async (id: string) => {
    const res = await axios.delete(`http://localhost:3001/sellers/${id}`);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id: string) => {
    const res = await axios.delete(`http://localhost:3001/users/${id}`);
    return id;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUsers.fulfilled,
        (
          state,
          action: PayloadAction<{ amount: number; result: UserType[] }>
        ) => {
          state.users = action.payload.result || [];
        }
      )
      .addCase(
        crearVendedor.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          const newArray = [...state.users];
          const reviewIndex = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          newArray.splice(reviewIndex, 1);
          state.users = [action.payload, ...newArray];
        }
      )
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user.id === action.payload);
        state.error = { code: null, message: null };
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "An error ocurred while deleting the user",
        };
      })
      .addCase(
        deleteSeller.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.sellers = state.sellers.filter(
            (seller) => seller.id === action.payload
          );

          state.error = { code: null, message: null };
        }
      )
      .addCase(deleteSeller.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "An error ocurred while deleting the seller",
        };
      });
  },
});

const {} = adminSlice.actions;

const selectUsers = (state: RootState) => state.admin.users;

export const selectors = { selectUsers };
export const actions = { getUsers, crearVendedor, deleteUser, deleteSeller };
export const helpers = {};

export default adminSlice.reducer;
