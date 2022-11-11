import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "domain";
import { RootState } from "../../app/store";
import { User } from "@auth0/auth0-react";

export type UserType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: number | null;
  isPremium: boolean;
  suspended: boolean;
  gender: "M"| "F"| "No binario"| "No quiero decir" | null;
  imagenDePerfil: string | null;
  address: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  countryId: number | null;
  sellerId: number | null;
};

type SliceState = {
  user: UserType | {};
  error: {code: number | null
          message: string | null
        }
} 

const initialState: SliceState = {
  user: {},
  error: {code: null,
          message: null
        }
}

const getUserByEmail = createAsyncThunk("user/getUserByEmail", async (email:string) => {
  const res = await axios.get(`http://localhost:3001/users/${email}`)
  return res.data
})


const createUser = createAsyncThunk("user/createUser", async (user: User) => {
  const res = await axios.post(`http://localhost:3001/users`, {
    email:user.email,
    firstName:user.given_name,
    lastName:user.family_name,
    phoneNumber:user.phone_number,
  })
})
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
  }, extraReducers: (builder) => {builder
    .addCase(
      getUserByEmail.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
      }
    )
    .addCase(
      getUserByEmail.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = {
          code:404,
          message: "User not found"
        }
      }
    )
  }
});

const selectError = (state: RootState) => state.user.error

const {
  
} = userSlice.actions;

export const selectors = { selectError };
export const actions = {
  getUserByEmail, createUser
};
export const helpers = {  };

export default userSlice.reducer;
