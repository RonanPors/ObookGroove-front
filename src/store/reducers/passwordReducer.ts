import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../hooks/redux';

type PasswordReducerState = {
  loading: boolean;
  error: string;
  email: string;
};

const initialState: PasswordReducerState = {
  loading: false,
  error: '',
  email: '',
};

// actions pour modifier les champs du formulaire
export const updateField = createAction<{
  field: string;
  value: string;
}>('RESET_PASSWORD/UPDATE_FIELD');

/*
------------------- RESET ----------------------
*/

// action asynchrone qui va appeler l'API
export const resetPassword = createAppAsyncThunk(
  'RESET_PASSWORD/RESET_PASSWORD_ASYNC',
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    const body = {
      email: store.password.email,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password`,
      body
    );
    console.log(data);
    return data;
  }
);

const passwordReducer = createReducer(initialState, (builder) => {
  builder
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
