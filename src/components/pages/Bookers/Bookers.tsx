import { Button } from 'semantic-ui-react';
<<<<<<< HEAD
import { useAppSelector } from '../../../hooks/redux';
import { useState, useEffect } from 'react';
=======
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
>>>>>>> 69dea02d73d853a081597f3ab6f08228df5474e4
import './Bookers.scss';
import { spotifyAuthorization } from '../../../store/reducers/booksReducer';

export default function Bookers() {
  const { pseudo } = useAppSelector((store) => store.user.userData);

<<<<<<< HEAD
  function dispatch(arg0: unknown): void {
    throw new Error('Function not implemented.');
  }

// const [response, setResponse] = useState();
//   useEffect(() => {
//     fetch('http://localhost:4000/auth/tokens')
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setResponse(data);
//       });
//   }, []);

=======
  const dispatch = useAppDispatch();
>>>>>>> 69dea02d73d853a081597f3ab6f08228df5474e4

  return (
    <>
      <h1>Bienvenue O'BG {pseudo} !</h1>
      <p>
        {' '}
        Pour obtenir une suggestion de livres, il faut connecter votre compte
        Spotify.
      </p>
      <Button onClick={() => dispatch(spotifyAuthorization())}>Ici !</Button>
    </>
  );
}
