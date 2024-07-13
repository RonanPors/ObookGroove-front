import axios from 'axios';
import { createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks/redux';
import { Book } from '../../@types/book';

type BooksReducerState = {
  loading: boolean;
  error: string;
  books: Book[];
};

const initialState: BooksReducerState = {
  loading: false,
  error: '',
  books: [],
};

/* --------------------------------------
-------------- SPOTIFY ------------------
----------------------------------------*/

export const spotifyAuthorization = createAppAsyncThunk(
  'BOOKS/SPOTIFY_AUTHORIZATION',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/spotify/connect-user`,
      {
        withCredentials: true,
      }
    );
    console.log(data.uri);
    return data.uri;
  }
);

/* --------------------------------------
------------ SPOTIFY CALLBACK -----------
----------------------------------------*/

export const getSpotifyToken = createAppAsyncThunk(
  'BOOKS/GET_SPOTIFY_TOKEN',
  async ({ code, state }: { code: string; state: string }) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/spotify/callback?code=${code}&state=${state}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
);

/* --------------------------------------
---- GET CURRENT BOOKS with GRAPHQL -----
----------------------------------------*/

// TODO faire avec graphQL

/* -----------------------------------
---- REDUCER With --------------------
----------------- spotify ------------
----------------- spotify callback ---
----------------- get Books ----------
--------------------------------------*/

const booksReducer = createReducer(initialState, (builder) => {
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
      state.books = action.payload;
    })
    .addCase(getSpotifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
  /* --------------------------------------
    ---------------- GET BOOKS --------------
    ----------------------------------------*/
  // .addCase(getBooks.pending, (state) => {
  //   state.loading = true;
  // })
  // .addCase(getBooks.fulfilled, (state, action) => {
  //   state.loading = false;
  //   state.books = action.payload;
  // })
  // .addCase(getBooks.rejected, (state, action) => {
  //   state.loading = false;
  //   state.error = action.error.message || 'Error';
  // });
});
export default booksReducer;
