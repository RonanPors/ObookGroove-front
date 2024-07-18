import { gql } from '@apollo/client';

/* --------------------------------------
---------------- INFO USER --------------
----------------------------------------*/

// fragment pour une partie de la requête INFO USER
const userDetailsFragment = gql`
  fragment UserDetails on User {
    id
    pseudo
  }
`;
// la requête
export const userByIdQuery = gql`
  query UserById($id: Int!) {
    user(id: $id) {
      ...UserDetails
    }
  }
  # la requête attend des arguments :
  ${userDetailsFragment}
`;

/* --------------------------------------
------------- CURRENT BOOKS --------------
----------------------------------------*/

// fragment pour une partie de la requête CURRENT BOOKS
const userCurrentBooksFragment = gql`
  fragment UserCurrentBooks on User {
    id
    pseudo
    currentBooks(limit: $limit) {
      id
      isbn
      numberOfPages
      resume
      title
      year
      genre
      cover
      author
      isFavorite
    }
  }
`;

// la requête CURRENT BOOKS
export const userCurrentBooksQuery = gql`
  query UserCurrentBooks($id: Int!, $limit: Int) {
    user(id: $id) {
      ...UserCurrentBooks
    }
  }
  ${userCurrentBooksFragment}
`;

/* --------------------------------------
------------ SUGGEST BOOKS --------------
----------------------------------------*/

// fragment pour une partie de la requête SUGGEST BOOKS
const userSuggestBooksFragment = gql`
  fragment UserSuggestBooks on User {
    id
    pseudo
    suggestBooks {
      id
      isbn
      numberOfPages
      resume
      title
      year
      genre
      cover
      author
      isFavorite
    }
  }
`;

// la requête SUGGEST BOOKS
export const userSuggestBooksQuery = gql`
  query UserSuggestBooks($id: Int!) {
    user(id: $id) {
      ...UserSuggestBooks
    }
  }
  ${userSuggestBooksFragment}
`;

/* --------------------------------------
------------ FAVORITE BOOKS --------------
----------------------------------------*/
// fragment pour une partie de la requête FAVORITE BOOKS

const userFavoriteBooksFragment = gql`
  fragment UserFavoriteBooks on Book {
    id
    isbn
    numberOfPages
    resume
    title
    year
    genre
    cover
    author
    isFavorite
  }
`;

// la requête FAVORITE BOOKS
export const userFavoriteBooksQuery = gql `
  query Query($id: Int!){
    user(id: $id) {
      favoriteBooks{
        ...UserFavoriteBooks
      }}
  }
  ${userFavoriteBooksFragment}
`;

