import { Button } from 'semantic-ui-react';
import { useAppSelector } from '../../../hooks/redux';
import './Bookers.scss';

export default function Bookers() {
  const { pseudo } = useAppSelector((store) => store.user.userData);

  return (
    <>
      <h1>Bienvenue O'BG {pseudo} !</h1>
      <p>
        {' '}
        Pour obtenir une suggestion de livres, il te faut connecter son compte
        Spotify.
      </p>
      <Button>Ici !</Button>
    </>
  );
}
