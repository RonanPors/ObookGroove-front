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
      `${import.meta.env.VITE_API_URL}/spotify/connect-user`
    );
    //? on reçoit quoi dans DATA en retour ?
    console.log(data);
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
    .addCase(spotifyAuthorization.fulfilled, (state) => {
      state.loading = false;
      // on récupère les livres et on set books ici.
      // state.books = action.payload;
    })
    .addCase(spotifyAuthorization.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error';
    });
  /* --------------------------------------
    -------------- GET BOOKS ------------------
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
