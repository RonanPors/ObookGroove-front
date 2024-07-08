import { useUserByIdQuery } from '../../../hooks/graphql';

export default function Landing() {
  const { user, loading, error } = useUserByIdQuery(1);

  return (
    <>
      {error && <p> Une erreur utilisateur</p>}
      <div>
        {loading && !error && <p>Chargement...</p>}
        {!loading && !error && <p>Bienvenue {user?.pseudo}</p>}
      </div>
    </>
  );
}
