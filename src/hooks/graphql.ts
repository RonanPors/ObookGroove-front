import { useQuery } from '@apollo/client';
import { userByIdQuery, userCurrentBooksQuery } from '../lib/gql/queries';

export function useUserByIdQuery(id: number | null) {
  const { data, loading, error } = useQuery(userByIdQuery, {
    variables: { id },
  });
  return { user: data?.user, loading, error: Boolean(error) };
}

export function useUserCurrentBooksQuery(
  id: number | null,
  limit: number | null
) {
  const { data, loading, error } = useQuery(userCurrentBooksQuery, {
    variables: { id, limit },
  });
  return { user: data?.user, loading, error: Boolean(error) };
}
