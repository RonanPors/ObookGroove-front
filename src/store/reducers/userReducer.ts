import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks/redux';
import { Credentials, UserData } from '../../@types/user';
import {
  ConfirmSignupArgs,
  NewPasswordArgs,
  confirmSignUpApi,
  logoutApi,
  logoutSpotifyApi,
  // getUser,
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
  logoutStatus: boolean;
  error: string;
  userData: UserData;
  cgu: boolean;
  isLogged: boolean;
  emailSent: string;
};

const initialState: UserReducerState = {
  menuIsOpen: false,
  loading: false,
  authSuccess: false,
  isSuccess: false,
  logoutStatus: false,
  error: '',
  userData: {
    credentials: {
      email: '',
      password: '',
    },
    pseudo: '',
    confirmPassword: '',
    id: null,
  },
  cgu: false,
  isLogged: false,
  emailSent: '',
};

// toggle du bouton burger => créer l'action :
export const toggleMenu = createAction('USER/TOGGLE_MENU');

// toggle de l'état "isSuccess" => créer l'action
export const toggleIsSuccess = createAction('USER/TOGGLE_IS_SUCCESS');

// toggle de l'état "isSuccess" => créer l'action
export const isLogged = createAction('USER/IS_LOGGED');

export const resetEmailSent = createAction('USER/RESET_EMAIL_SENT');

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

// action pour réinitialiser la case CGU :
export const toggleCgu = createAction<{ cgu: boolean }>('USER/RESET_CGU');

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

/* --------------------------------------
---------------- LOGOUT -----------------
----------------------------------------*/

export const logout = createAppAsyncThunk(
  'USER/LOGOUT_ASYNC',
  async (_, thunkAPI) => {
    try {
      return await logoutApi();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* --------------------------------------
------------ LOGOUT SPOTIFY -------------
----------------------------------------*/

export const logoutSpotify = createAppAsyncThunk(
  'USER/LOGOUT_SPOTIFY_ASYNC',
  async (_, thunkAPI) => {
    try {
      return await logoutSpotifyApi();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* --------------------------------------
------------- LOGOUT TOTAL --------------
----------------------------------------*/

export const logoutTotal = createAppAsyncThunk(
  'USER/LOGOUT_TOTAL_ASYNC',
  async (_, thunkAPI) => {
    try {
      return await Promise.all([
        thunkAPI.dispatch(logout()).unwrap(),
        thunkAPI.dispatch(logoutSpotify()).unwrap(),
      ]);
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

    .addCase(isLogged, (state) => {
      // toggle sur isLogged => modifie l'état
      state.isLogged = !state.isLogged;
    })

    .addCase(resetEmailSent, (state) => {
      state.emailSent = '';
    })

    .addCase(updateFieldUserData, (state, action) => {
      // le payload correspond aux données de l'action asynchrone
      const { field } = action.payload;
      // pour pouvoir avoir la mise à jour des champs credentials
      if (field === 'credentials' || field === 'id') {
        return;
      }
      state.userData[field] = action.payload.value;
    })

    .addCase(updateFieldCredentials, (state, action) => {
      // le payload récupère les données de l'action asynchrone
      const { field } = action.payload;
      state.userData.credentials[field] = action.payload.value;
    })

    .addCase(toggleCgu, (state, action) => {
      state.cgu = action.payload.cgu;
    })

    /* ------------------------------
    ---------- SIGN UP --------------
    ---------------------------------*/

    .addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.emailSent = '';
    })
    .addCase(signup.fulfilled, (state) => {
      state.loading = false;
      // pour personnaliser le message d'envoi concernant la confirmation par email
      state.emailSent = state.userData.credentials.email;
      // vider les changer une fois que c'est validé
      state.userData.pseudo = '';
      state.userData.credentials.email = '';
      state.userData.credentials.password = '';
      state.userData.confirmPassword = '';
      state.cgu = false;
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
      state.loading = false;
      state.isLogged = true;
      // on utilise ce "true" pour faire une redirection :
      state.authSuccess = true;
      state.logoutStatus = false;
      // on récupère l'id via le token :
      state.userData.id = action.payload.id;
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
      state.loading = false;
      state.isLogged = true;
      // on utilise ce "true" pour faire une redirection :
      state.authSuccess = true;
      state.logoutStatus = false;
      // vider les changer une fois que c'est validé
      state.userData.credentials.email = '';
      state.userData.credentials.password = '';
      // on récupère l'id via le token :
      state.userData.id = action.payload.id;
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
    --------- NEW PASSWORD -----------
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
    })

    /* -------------------------------
    ------------- LOGOUT -------------
    ---------------------------------*/

    .addCase(logout.pending, (state) => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isLogged = false;
      state.authSuccess = false;
      state.logoutStatus = true;
    })
    .addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* -------------------------------
    --------- LOGOUT SPOTIFY ---------
    ---------------------------------*/

    .addCase(logoutSpotify.pending, (state) => {
      state.loading = true;
    })
    .addCase(logoutSpotify.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(logoutSpotify.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* -------------------------------
    ---------- LOGOUT TOTAL ----------
    ---------------------------------*/

    .addCase(logoutTotal.pending, (state) => {
      state.loading = true;
    })
    .addCase(logoutTotal.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(logoutTotal.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
});

export default userReducer;
