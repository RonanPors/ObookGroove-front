import axios from 'axios';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks/redux';
import {
  Credentials,
  SignupResponse,
  SigninResponse,
  UserData,
} from '../../@types/user';

type UserReducerState = {
  menuIsOpen: boolean;
  loading: boolean;
  authSuccess: boolean;
  error: string;
  userData: UserData;
};

const initialState: UserReducerState = {
  menuIsOpen: false,
  loading: false,
  authSuccess: false,
  error: '',
  userData: {
    credentials: {
      email: '',
      password: '',
    },
    pseudo: '',
    confirmPassword: '',
    phoneNumber: '',
    accessToken : '',
    refreshToken : ''
  },
};

// toggle du bouton burger => créer l'action :
export const toggleMenu = createAction('USER/TOGGLE_MENU');

// typage des données d'inscription
export type KeysOfCredentials = keyof Credentials;
export type KeysOfUserData = keyof UserData;

// actions pour modifier les champs du formulaire
export const updateFieldUserData = createAction<{
  field: KeysOfUserData;
  value: string;
}>('USER/UPDATE_FIELD_USER_DATA');

export const updateFieldCredentials = createAction<{
  field: KeysOfCredentials;
  value: string;
}>('USER/UPDATE_FIELD_CREDENTIALS');

/* --------------------------------------
---------------- SIGN UP -----------------
----------------------------------------*/

// inscription de l'utilisateur avec fetch asynchrone
export const signup = createAppAsyncThunk(
  'USER/SIGNUP_ASYNC',
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    // on peut ici indiquer les données qui vont au back
    const body = {
      email: store.user.userData.credentials.email,
      password: store.user.userData.credentials.password,
      confirmPassword: store.user.userData.confirmPassword,
      pseudo: store.user.userData.pseudo,
    };
    const { data } = await axios.post<SignupResponse>(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      body
    );
    console.log(data);
    return data;
  }
);

/* --------------------------------------
--------- CONFIRM SIGN UP --------------
----------------------------------------*/

type ConfirmSignupArgs = {
  userId: string;
  confirmToken: string;
};

export const confirmSignUp = createAppAsyncThunk(
  'USER/CONFIRM_SIGNUP_ASYNC',
  async ({ userId, confirmToken }: ConfirmSignupArgs) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/confirm-signup`,
      {
        userId,
        confirmToken,
      }
    );

    console.log(data);
    return data;
  }
);

/* --------------------------------------
---------------- SIGN IN -----------------
----------------------------------------*/

export const signin = createAppAsyncThunk(
  'USER/SIGNIN_ASYNC',
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    const body = {
      email: store.user.userData.credentials.email,
      password: store.user.userData.credentials.password,
    };
    const { data } = await axios.post<SigninResponse>(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      body
    );
    console.log(data);
    return data;
  }
);

/* --------------------------------------
------------ RESET PASSWORD -------------
----------------------------------------*/

export const resetPassword = createAppAsyncThunk(
  'USER/RESET_PASSWORD_ASYNC',
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    const body = {
      email: store.user.userData.credentials.email,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password`,
      body
    );
    console.log(data);
    return data;
  }
);

/* -------------------------------------
------------- NEW PASSWORD -------------
----------------------------------------*/

type NewPasswordArgs = {
  userId: string;
  resetToken: string;
};

export const newPassword = createAppAsyncThunk(
  'USER/NEW_PASSWORD_ASYNC',
  async ({ userId, resetToken }: NewPasswordArgs, thunkAPI) => {
    console.log(userId, resetToken);
    const store = thunkAPI.getState();
    const body = {
      password: store.user.userData.credentials.password,
      confirmPassword: store.user.userData.confirmPassword,
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password/${userId}/${resetToken}`,
      body
    );

    console.log(data);
    return data;
  }
);

/* -----------------------------------
---- REDUCER With --------------------
----------------- toggle -------------
----------------- signup -------------
----------------- confirm signup -----
----------------- signin -------------
----------------- reset password -----
----------------- new password -------
--------------------------------------*/

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleMenu, (state) => {
      // toggle du bouton burger => modifie l'état
      state.menuIsOpen = !state.menuIsOpen;
    })
    .addCase(updateFieldUserData, (state, action) => {
      // le payload correspond aux données de l'action asynchrone
      const { field } = action.payload;
      // pour pouvoir avoir la mise à jour des champs credentials
      if (field === 'credentials') {
        return;
      }
      state.userData[field] = action.payload.value;
    })
    .addCase(updateFieldCredentials, (state, action) => {
      // le payload récupère les données de l'action asynchrone
      const { field } = action.payload;
      state.userData.credentials[field] = action.payload.value;
    })

    /* ------------------------------
    ---------- SIGN UP --------------
    ---------------------------------*/

    .addCase(signup.pending, (state) => {
      state.loading = true;
    })
    .addCase(signup.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    })

    /* -------------------------------
    ------- CONFIRM SIGN UP ----------
    ---------------------------------*/

    .addCase(confirmSignUp.pending, (state) => {
      state.loading = true;
    })
    .addCase(confirmSignUp.fulfilled, (state, action) => {
      state.userData.pseudo = action.payload.pseudo;
      state.loading = false;
      state.authSuccess = true;
    })
    .addCase(confirmSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    })

    /* ------------------------------
    ---------- SIGN IN --------------
    ---------------------------------*/

    .addCase(signin.pending, (state) => {
      state.loading = true;
    })
    .addCase(signin.fulfilled, (state, action) => {
      // payload renvoie la réponse demandée à la BDD (ici, le pseudo)
      state.userData.pseudo = action.payload.pseudo;
      state.loading = false;
      state.authSuccess = true;
      state.userData.accessToken = action.payload.accessToken;
      state.userData.refreshToken = action.payload.refreshToken;
    })
    .addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    })

    /* -------------------------------
    --------- RESET PASSWORD ---------
    ---------------------------------*/

    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    })

    /* -------------------------------
    --------- NEW PASSWORD ---------
    ---------------------------------*/

    .addCase(newPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(newPassword.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(newPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
});

export default userReducer;
