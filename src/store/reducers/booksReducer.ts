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
      // TODO : renommer la route en fonction de celle de l'API
      `${import.meta.env.VITE_API_URL}/auth/spotify`
    );
    console.log(data);
    return data;
  }
);

/* --------------------------------------
-------------- GET BOOKS -----------------
----------------------------------------*/

export const getBooks = createAppAsyncThunk('BOOKS/GET_BOOKS', async () => {
  const { data } = await axios.get(
    // TODO : renommer la route en fonction de celle de l'API
    `${import.meta.env.VITE_API_URL}/books`
  );
  console.log(data);
  return data;
});

/* ---------------------------------- 
---- REDUCER With -------------------
----------------- spotify
----------------- get Books
--------------------------------------*/

const booksReducer = createReducer(initialState, (builder) => {
  builder
    /* --------------------------------------
    -------------- SPOTIFY ------------------
    ----------------------------------------*/
    .addCase(spotifyAuthorization.pending, (state) => {
      state.loading = true;
    })
    .addCase(spotifyAuthorization.fulfilled, (state) => {
      state.loading = false;
      // soit on récupère les livres et on set books ici.
      // state.books = action.payload;
      // soit on refait une autre demande get.
    })
    .addCase(spotifyAuthorization.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    })
    /* --------------------------------------
    -------------- GET BOOKS ------------------
    ----------------------------------------*/

    .addCase(getBooks.pending, (state) => {
      state.loading = true;
    })
    .addCase(getBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
    })
    .addCase(getBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
});
export default booksReducer;
