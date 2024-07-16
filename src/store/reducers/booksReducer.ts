import { createReducer } from '@reduxjs/toolkit';
import { Book } from '../../@types/book';
import { createAppAsyncThunk } from '../../hooks/redux';
import { userCurrentBooksQuery, apolloClient } from '../../lib/gql/queries';
// import { useUserCurrentBooksQuery } from '../../hooks/graphql';

type BooksReducerState = {
  loading: boolean;
  error: string;
  books: Book[];
  pseudo: string;
};

const initialState: BooksReducerState = {
  loading: false,
  error: '',
  books: [],
  pseudo: '',
};

/* --------------------------------------
------------- CURRENT BOOKS -------------
----------------------------------------*/

export const currentBooks = createAppAsyncThunk(
  'BOOKS/CURRENT_BOOKS_ASYNC',
  async ({ id, limit }: { id: number | null; limit: number | null }) => {
    // appel du hook graphql
    try {
      return await apolloClient.query({
        query: userCurrentBooksQuery,
        variables: { id, limit },
      });
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Unknown Error';
    }
  }
);

/* --------------------------------------
------------- SUGGEST BOOKS -------------
----------------------------------------*/

/* -----------------------------------
---- REDUCER With --------------------
----------------- current books ------
----------------- suggest books ------
--------------------------------------*/

const booksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(currentBooks.pending, (state) => {
      state.loading = true;
    })
    .addCase(currentBooks.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.books = action.payload.data.user.currentBooks;
      state.pseudo = action.payload.data.user.pseudo;
    })
    .addCase(currentBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
});

export default booksReducer;
