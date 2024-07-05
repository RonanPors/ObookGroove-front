import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../hooks/redux';
import { Credentials } from '../../@types/user';

type PasswordReducerState = {
  loading: boolean;
  error: string;
  credentials: Credentials;
  confirmPassword: string;
};

const initialState: PasswordReducerState = {
  loading: false,
  error: '',
  credentials: {
    email: '',
    password: '',
  },
  confirmPassword: '',
};

export type KeysOfCredential = keyof Credentials;

// actions pour modifier les champs du formulaire
export const updateField = createAction<{
  field: KeysOfCredential;
  value: string;
}>('RESET_PASSWORD/UPDATE_FIELD');

export const updateConfirmPassword = createAction<{
  value: string;
}>('RESET_PASSWORD/UPDATE_CONFIRM_PASSWORD');

/*
------------------- RESET ----------------------
*/

// action asynchrone qui va appeler l'API
export const resetPassword = createAppAsyncThunk(
  'RESET_PASSWORD/RESET_PASSWORD_ASYNC',
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    const body = {
      email: store.password.credentials.email,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password`,
      body
    );
    console.log(data);
    return data;
  }
);
/*
------------------- NEW PASSWORD ----------------------
*/

type NewArgs = {
  userId: string;
  resetToken: string;
};

export const newPassword = createAppAsyncThunk(
  'NEW_PASSWORD/NEW_PASSWORD_ASYNC',
  async ({ userId, resetToken }: NewArgs, thunkAPI) => {
    console.log(userId, resetToken);
    const store = thunkAPI.getState();
    const body = {
      password: store.password.credentials.password,
      confirmPassword: store.password.confirmPassword,
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password/${userId}/${resetToken}`,
      body
    );

    console.log(data);
    return data;
  }
);

const passwordReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateField, (state, action) => {
      // le payload correspond aux données de l'action asynchrone
      const { field } = action.payload;
      state.credentials[field] = action.payload.value;
    })
    .addCase(updateConfirmPassword, (state, action) => {
      state.confirmPassword = action.payload.value;
    })
    /* -----------------------------
    ------------- RESET --------------
    --------------------------------- */
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });

  /* -------------------------------
    -------- NEW (reinitial) ---------
    --------------------------------- */
});

export default passwordReducer;
