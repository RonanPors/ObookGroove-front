import { createAction, createReducer } from '@reduxjs/toolkit';
import { Book } from '../../@types/book';
import { createAppAsyncThunk } from '../../hooks/redux';
import { apolloClient } from '../../lib/gql/apolloClient';
import {
  userCurrentBooksQuery,
  userSuggestBooksQuery,
  userFavoriteBooksQuery,
} from '../../lib/gql/queries';
import { updateFavoriteBookMutation } from '../../lib/gql/mutations';
import {
  getSpotifyTokenApi,
  spotifyAuthorizationApi,
} from '../../lib/spotifyApi';

type BooksReducerState = {
  loading: boolean;
  loadingSpotify: boolean;
  error: string | null;
  books: Book[];
  pseudo: string;
  openModal: boolean;
  idBookModal: number | null;
};

const initialState: BooksReducerState = {
  loadingSpotify: false,
  loading: false,
  error: null,
  books: [],
  pseudo: '',
  openModal: false,
  idBookModal: null,
};

// Mise à jour de isFavorite des books store.
export const updateFavoriteBookState = createAction<{ bookId: number }>(
  'BOOKS/UPDATE_FAVORITE_BOOK_STATE'
);

// action toggle de l'état openModal
export const toggleOpenModal = createAction<{
  idBookModal: number | null;
}>('BOOKS/TOGGLE_OPEN_MODAL');

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

/* --------------------------------------
---------- UPDATE FAVORITE BOOK ---------
----------------------------------------*/

export const updateFavoriteBook = createAppAsyncThunk(
  'BOOKS/UPDATE_FAVORITE_BOOK',
  async ({
    userId,
    bookId,
    isFavorite,
  }: {
    userId: number | null;
    bookId: number | null;
    isFavorite: boolean;
  }) => {
    try {
      return await apolloClient.mutate({
        mutation: updateFavoriteBookMutation,
        variables: { input: { userId, bookId, isFavorite } },
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
---------- FAVORITE BOOK LIBRARY---------
----------------------------------------*/
export const favoriteBooks = createAppAsyncThunk(
  'BOOKS/FAVORITES_BOOKS_ASYNC',
  async ({ id }: { id: number | null }) => {
    try {
      return await apolloClient.query({
        query: userFavoriteBooksQuery,
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

/* ---------------------------------------
---- REDUCER With ------------------------
----------------- spotify ----------------
----------------- spotify callback -------
----------------- current books ----------
----------------- suggest books ----------
----------------- update favorite books --
----------------- favorite books library -
-----------------------------------------*/

const booksReducer = createReducer(initialState, (builder) => {
  builder

    /* --------------------------------------
    -------------- FAVORITE BOOK STATE---------
    ----------------------------------------*/
    .addCase(updateFavoriteBookState, (state, action) => {
      state.books = state.books.map((book) => {
        if (book.id === action.payload.bookId) {
          book.isFavorite = !book.isFavorite;
        }
        return book;
      });
    })

    /* --------------------------------------
    -------------- MODAL BOOK----------------
    ----------------------------------------*/
    .addCase(toggleOpenModal, (state, action) => {
      state.openModal = !state.openModal;
      state.idBookModal = action.payload.idBookModal;
    })

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
      state.loadingSpotify = true;
    })
    .addCase(getSpotifyToken.fulfilled, (state, action) => {
      state.loading = false;
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
      state.loading = true;
    })
    .addCase(suggestBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.data.user.suggestBooks;
      state.pseudo = action.payload.data.user.pseudo;
    })
    .addCase(suggestBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })

    /* --------------------------------------
    --------- UPDATE FAVORITE BOOK ----------
    ----------------------------------------*/
    .addCase(updateFavoriteBook.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateFavoriteBook.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(updateFavoriteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    })
    /* --------------------------------------
    ---------  FAVORITE BOOK LIBRARY----------
    ----------------------------------------*/
    .addCase(favoriteBooks.pending, (state) => {
      state.loading = true;
    })
    .addCase(favoriteBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.data.user.favoriteBooks;
    })
    .addCase(favoriteBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Error';
    });
});

export default booksReducer;
