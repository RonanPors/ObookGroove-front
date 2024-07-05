import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import passwordReducer from './reducers/passwordReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    password: passwordReducer,
  },
});

export default store;

// J'utilise 2 hooks natifs du store' `RootState` et `AppDispatch` qui seront typés dans le fichier redux.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
