import { gql } from '@apollo/client';

/* --------------------------------------
---------- UPDATE FAVORITE BOOK ---------
----------------------------------------*/
const updateFavoriteBookFragment = gql`
  fragment UpdateFavoriteBook on UserHasBook {
    bookId
    userId
    isFavorite
  }
`;

// la requête UPDATE FAVORITE BOOK

export const updateFavoriteBookMutation = gql`
  mutation updateUserHasBook($input: UserHasBookInputUpdate) {
    updateUserHasBook(input: $input) {
      ...UpdateFavoriteBook
    }
  }
  ${updateFavoriteBookFragment}
`;
