import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks/redux';
import { Credentials, UserData } from '../../@types/user';
import {
  ConfirmSignupArgs,
  NewPasswordArgs,
  confirmSignUpApi,
  newPasswordApi,
  resetPasswordApi,
  signinApi,
  signupApi,
} from '../../lib/authApi';

type UserReducerState = {
  menuIsOpen: boolean;
  loading: boolean;
  authSuccess: boolean;
  isSuccess: boolean;
  error: string;
  userData: UserData;
};

const initialState: UserReducerState = {
  menuIsOpen: false,
  loading: false,
  authSuccess: false,
  isSuccess: false,
  error: '',
  userData: {
    credentials: {
      email: '',
      password: '',
    },
    pseudo: '',
    confirmPassword: '',
  },
};

// toggle du bouton burger => créer l'action :
export const toggleMenu = createAction('USER/TOGGLE_MENU');

// toggle de l'état "isSuccess" => créer l'action
export const toggleIsSuccess = createAction('USER/TOGGLE_IS_SUCCESS');

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

    // on indique les données qui vont au back
    const body = {
      email: store.user.userData.credentials.email,
      password: store.user.userData.credentials.password,
      confirmPassword: store.user.userData.confirmPassword,
      pseudo: store.user.userData.pseudo,
    };

    // appel de l'API (voir fichier lib/authApi.ts)
    try {
      return await signupApi(body);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* --------------------------------------
--------- CONFIRM SIGN UP --------------
----------------------------------------*/

export const confirmSignUp = createAppAsyncThunk(
  'USER/CONFIRM_SIGNUP_ASYNC',
  async ({ userId, confirmToken }: ConfirmSignupArgs, thunkAPI) => {
    // appel de l'API (voir fichier lib/authApi.ts)
    try {
      return await confirmSignUpApi({ userId, confirmToken });
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
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

    // appel de l'API (voir fichier lib/authApi.ts)
    try {
      return await signinApi(body);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
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

    // appel de l'API (voir fichier lib/authApi.ts)
    try {
      return await resetPasswordApi(body);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* -------------------------------------
------------- NEW PASSWORD -------------
----------------------------------------*/

export const newPassword = createAppAsyncThunk(
  'USER/NEW_PASSWORD_ASYNC',
  async ({ userId, resetToken }: NewPasswordArgs, thunkAPI) => {
    const store = thunkAPI.getState();

    const body = {
      password: store.user.userData.credentials.password,
      confirmPassword: store.user.userData.confirmPassword,
    };

    // appel de l'API (voir fichier lib/authApi.ts)
    try {
      return await newPasswordApi(body, { userId, resetToken });
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* ----------------------------------------------
---- REDUCER With -------------------------------
----------------- toggles & fields --------------
----------------- signup ------------------------
----------------- confirm signup ----------------
----------------- signin ------------------------
----------------- reset password ----------------
----------------- new password ------------------
-------------------------------------------------*/

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleMenu, (state) => {
      // toggle du bouton burger => modifie l'état
      state.menuIsOpen = !state.menuIsOpen;
    })

    .addCase(toggleIsSuccess, (state) => {
      // toggle sur isSuccess => modifie l'état
      state.isSuccess = !state.isSuccess;
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
      state.error = '';
    })
    .addCase(signup.fulfilled, (state) => {
      state.loading = false;
      // vider les changer une fois que c'est validé
      state.userData.pseudo = '';
      state.userData.credentials.email = '';
      state.userData.credentials.password = '';
      state.userData.confirmPassword = '';
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* -------------------------------
    ------- CONFIRM SIGN UP ----------
    ---------------------------------*/

    .addCase(confirmSignUp.pending, (state) => {
      state.loading = true;
    })
    .addCase(confirmSignUp.fulfilled, (state, action) => {
      // ? récupération du pseudo ?
      state.userData.pseudo = action.payload.pseudo;
      state.loading = false;
      // on utilise ce "true" pour faire une redirection :
      state.authSuccess = true;
    })
    .addCase(confirmSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* ------------------------------
    ---------- SIGN IN --------------
    ---------------------------------*/

    .addCase(signin.pending, (state) => {
      state.loading = true;
    })
    .addCase(signin.fulfilled, (state, action) => {
      // ? récupération du pseudo ?
      state.userData.pseudo = action.payload?.pseudo;
      state.loading = false;
      // on utilise ce "true" pour faire une redirection :
      state.authSuccess = true;
      // vider les changer une fois que c'est validé
      state.userData.credentials.email = '';
      state.userData.credentials.password = '';
    })
    .addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* -------------------------------
    --------- RESET PASSWORD ---------
    ---------------------------------*/

    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      // vider les changer une fois que c'est validé
      state.userData.credentials.email = '';
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* -------------------------------
    --------- NEW PASSWORD ---------
    ---------------------------------*/

    .addCase(newPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(newPassword.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
      // vider les changer une fois que c'est validé
      state.userData.credentials.password = '';
      state.userData.confirmPassword = '';
    })
    .addCase(newPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
});

export default userReducer;
