import { createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks/redux';
import { Book } from '../../@types/book';
import {
  getSpotifyTokenApi,
  spotifyAuthorizationApi,
} from '../../lib/spotifyApi';

type SpotifyReducerState = {
  loading: boolean;
  error: string;
  books: Book[];
};

const initialState: SpotifyReducerState = {
  loading: false,
  error: '',
  books: [],
};

/* --------------------------------------
-------------- SPOTIFY ------------------
----------------------------------------*/

export const spotifyAuthorization = createAppAsyncThunk(
  'SPOTIFY/SPOTIFY_AUTHORIZATION',
  async (_, thunkAPI) => {
    // appel de l'API (voir fichier lib/bookApi.ts)
    try {
      return await spotifyAuthorizationApi();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* --------------------------------------
------------ SPOTIFY CALLBACK -----------
----------------------------------------*/

export const getSpotifyToken = createAppAsyncThunk(
  'SPOTIFY/GET_SPOTIFY_TOKEN',
  async ({ code, state }: { code: string; state: string }, thunkAPI) => {
    try {
      return await getSpotifyTokenApi(code, state);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown Error');
    }
  }
);

/* -----------------------------------
---- REDUCER With --------------------
----------------- spotify ------------
----------------- spotify callback ---
--------------------------------------*/

const spotifyReducer = createReducer(initialState, (builder) => {
  builder
    /* --------------------------------------
    -------------- SPOTIFY ------------------
    ----------------------------------------*/
    .addCase(spotifyAuthorization.pending, (state) => {
      state.loading = true;
    })
    .addCase(spotifyAuthorization.fulfilled, (state, action) => {
      state.loading = false;
      window.location.href = action.payload;
    })
    .addCase(spotifyAuthorization.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })
    /* --------------------------------------
    ----------- SPOTIFY CALLBACK ------------
    ----------------------------------------*/
    .addCase(getSpotifyToken.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSpotifyToken.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.books = action.payload;
    })
    .addCase(getSpotifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
});
export default spotifyReducer;
