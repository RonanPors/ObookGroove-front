import { createAction, createReducer } from '@reduxjs/toolkit';

type UserReducerState = {
  menuIsOpen: boolean;
};

const initialState: UserReducerState = {
  menuIsOpen: false,
};

export const toggleMenu = createAction('USER/TOGGLE_MENU');

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleMenu, (state) => {
    state.menuIsOpen = !state.menuIsOpen;
  });
});

export default userReducer;
