import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './reducers/userReducer';
import booksReducer from './reducers/booksReducer';

const persistUserConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore l'action persist/PURGE
        ignoredActions: ['persist/PURGE'],
        // Ignore le path "result" dans l'action "persist/PURGE"
        ignoredActionPaths: ['result'],
      },
    }),
});

export default store;

export const persistor = persistStore(store);

// J'utilise 2 hooks natifs du store' `RootState` et `AppDispatch` qui seront typés dans le fichier redux.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
