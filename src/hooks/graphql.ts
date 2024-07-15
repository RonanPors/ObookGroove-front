import { useQuery } from '@apollo/client';
import { userByIdQuery } from '../lib/gql/queries';

export function useUserByIdQuery(id: number | null) {
  const { data, loading, error } = useQuery(userByIdQuery, {
    variables: { id },
  });
  return { user: data?.user, loading, error: Boolean(error) };
}
