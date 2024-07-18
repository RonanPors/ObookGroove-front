import { useQuery } from '@apollo/client';
import {
  userByIdQuery,
  userCurrentBooksQuery,
  userSuggestBooksQuery,
} from '../lib/gql/queries';

/* --------------------------------------
---------------- INFO USER --------------
----------------------------------------*/

export function useUserByIdQuery(id: number | null) {
  const { data, loading, error } = useQuery(userByIdQuery, {
    variables: { id },
  });
  return { user: data?.user, loading, error: Boolean(error) };
}

/* --------------------------------------
------------- CURRENT BOOKS --------------
----------------------------------------*/

export function useUserCurrentBooksQuery(
  id: number | null,
  limit: number | null
) {
  const { data, loading, error } = useQuery(userCurrentBooksQuery, {
    variables: { id, limit },
  });
  return { user: data?.user, loading, error: Boolean(error) };
}

/* --------------------------------------
------------ SUGGEST BOOKS --------------
----------------------------------------*/

export function useUserSuggestBooksQuery(id: number | null) {
  const { data, loading, error } = useQuery(userSuggestBooksQuery, {
    variables: { id },
  });
  return { user: data?.user, loading, error: Boolean(error) };
}
