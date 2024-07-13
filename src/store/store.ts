import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import spotifyReducer from './reducers/spotifyReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    books: spotifyReducer,
  },
});

export default store;

// J'utilise 2 hooks natifs du store' `RootState` et `AppDispatch` qui seront typés dans le fichier redux.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
