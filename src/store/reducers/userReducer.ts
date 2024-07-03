import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks/redux';
import axios from 'axios';
import { UserData } from '../../@types/settings';

type UserReducerState = {
  menuIsOpen: boolean;
  loading: boolean;
  error: string;
  userData: UserData;
};

const initialState: UserReducerState = {
  menuIsOpen: false,
  loading: false,
  error: '',
  userData: {
    credentials: {
      email: '',
      password: '',
    },
    pseudo: '',
    confirmPassword: '',
    phoneNumber: '',
    cgu: false,
  },
};

// toggle du bouton burger => créer l'action :
export const toggleMenu = createAction('USER/TOGGLE_MENU');

// inscription de l'utilisateur avec fetch asynchrone
export const signup = createAppAsyncThunk(
  'USER/SIGNUP_ASYNC',
  async (_, thunkAPI) => {
    const store = thunkAPI.getState();
    // on peut ici valider/formatter les données
    const body = {
      ...store.user.userData,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      body
    );
    console.log(data);
    return data as { pseudo: string };
    // récupération du pseudo pour l'afficher sur la page booker en message de bienvenue
  }
);

const userReducer = createReducer(initialState, (builder) => {
  // toggle du bouton burger => modifie l'état
  builder
    .addCase(toggleMenu, (state) => {
      state.menuIsOpen = !state.menuIsOpen;
    })
    .addCase(signup.pending, (state) => {
      state.loading = true;
    })
    .addCase(signup.fulfilled, (state, action) => {
      // payload renvoie la réponse demandée à la BDD (ici, le pseudo)
      state.userData.pseudo = action.payload.pseudo;
      state.loading = false;
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
});

export default userReducer;
