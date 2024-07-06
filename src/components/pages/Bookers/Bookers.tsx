import { Button } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './Bookers.scss';
import { spotifyAuthorization } from '../../../store/reducers/booksReducer';

export default function Bookers() {
  const { pseudo } = useAppSelector((store) => store.user.userData);

  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Bienvenue O'BG {pseudo} !</h1>
      <p>
        {' '}
        Pour obtenir une suggestion de livres, il te faut connecter son compte
        Spotify.
      </p>
      <Button onClick={() => dispatch(spotifyAuthorization())}>Ici !</Button>
    </>
  );
}
