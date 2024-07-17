import { createReducer } from '@reduxjs/toolkit';
import { Book } from '../../@types/book';
import { createAppAsyncThunk } from '../../hooks/redux';
import { userCurrentBooksQuery, apolloClient, userSuggestBooksQuery } from '../../lib/gql/queries';
import {
  getSpotifyTokenApi,
  spotifyAuthorizationApi,
} from '../../lib/spotifyApi';


type BooksReducerState = {
  loading: boolean;
  error: string | null;
  books: Book[];
  pseudo: string;
};

const initialState: BooksReducerState = {
  loading: false,
  error: null,
  books: [],
  pseudo: '',
};

/* --------------------------------------
-------------- SPOTIFY ------------------
----------------------------------------*/

export const spotifyAuthorization = createAppAsyncThunk(
  'BOOKS/SPOTIFY_AUTHORIZATION_ASYNC',
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
  'BOOKS/GET_SPOTIFY_TOKEN_ASYNC',
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

export const suggestBooks = createAppAsyncThunk(
  'BOOKS/SUGGEST_BOOKS_ASYNC',
  async ({ id }: { id: number | null }) => {
    // appel du hook graphql
    try {
      return await apolloClient.query({
        query: userSuggestBooksQuery,
        variables: { id },
      });
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Unknown Error';
    }
  }
);
/* -----------------------------------
---- REDUCER With --------------------
----------------- spotify -------------
----------------- spotify callback ----
----------------- current books ------
----------------- suggest books ------
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
      console.log(action.payload);
      state.books = action.payload;
    })
    .addCase(getSpotifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })
    /* --------------------------------------
    ------------- CURRENT BOOKS -------------
    ----------------------------------------*/
    .addCase(currentBooks.pending, (state) => {
      state.loading = true;
    })
    .addCase(currentBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.data.user.currentBooks;
      state.pseudo = action.payload.data.user.pseudo;
    })
    .addCase(currentBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })
    /* --------------------------------------
    ------------- SUGGEST BOOKS -------------
    ----------------------------------------*/
    .addCase(suggestBooks.pending, (state) => {
      state.loading=true;
    }) 
    .addCase(suggestBooks.fulfilled, (state, action) => {
      state.loading = false
      console.log(action.payload);
      state.books = action.payload.data.user.suggestBooks;
      state.pseudo = action.payload.data.user.pseudo;
    })
    .addCase(suggestBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
});

export default booksReducer;
