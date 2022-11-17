import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import backAxios from "../../helpers/Axios";
import { RootState } from "../../app/store";
import { User } from "@auth0/auth0-react";


export type UserType = {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  suspended: boolean;
  gender: "M" | "F" | "No binario" | "Prefiero no decirlo" | null;
  imagenDePerfil: string | null;
  address: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  countryId: number | null;
  sellerId: string | null;
};

type SliceState = {
  user: UserType | {};
  status: "loggedIn" | "loggedOut";
  error: {
    code: number | null;
    message: string | null;
  };
};

const initialState: SliceState = {
  user: {},
  status: "loggedOut",
  error: {
    code: null,
    message: null,
  },
};

export const getUserByEmail = createAsyncThunk(
  "user/getUserByEmail",
  async (email: string) => {
    const res = await backAxios.get(`/users/${email}`);
    return res.data;
  }
);

export const getUsers = createAsyncThunk("user/users", async (user: User) => {
  const res = await backAxios.get(`/users`);
  return res.data;
});

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: string) => {
    const res = await backAxios.get(`/users/${id}`);
    return res.data;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: User) => {
    const res = await backAxios.post(`/users`, {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      phoneNumber: user.phone_number,
      imagenDePerfil: user.picture,
    });
    return res.data;
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ user, id }: { user: Partial<UserType>; id: string }) => {
    console.log(user);
    const res = await backAxios.put(`/users/${id}`, {
      ...user,
    });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserByEmail.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = action.payload;
          state.error = { code: null, message: null };
          state.status = "loggedIn";
        }
      )

      .addCase(getUserByEmail.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "User not found",
        };
      })

      .addCase(
        getUserById.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = action.payload;
          state.error = { code: null, message: null };
        }
      )

      .addCase(getUserById.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 404,
          message: "User not found",
        };
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = action.payload;
          state.error = { code: null, message: null };
        }
      )
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "Hubo un error al crear el usuario",
        };
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.error = { code: null, message: null };
      })
      .addCase(editUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = {
          code: 500,
          message: "Hubo un error al editar el usuario",
        };
      });
  },
});

const selectError = (state: RootState) => state.user.error;
export const selectUser = (state: RootState) => state.user.user;
const selectStatus = (state: RootState) => state.user.status;
const {} = userSlice.actions;

export const selectors = { selectError, selectUser, selectStatus };
export const actions = {
  getUserByEmail,
  createUser,
  editUser,
  getUserById,
};
export const helpers = {};

export default userSlice.reducer;
