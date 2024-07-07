import { Button } from 'semantic-ui-react';
import { useAppSelector } from '../../../hooks/redux';
import { useState, useEffect } from 'react';
import './Bookers.scss';

export default function Bookers() {
  const { pseudo } = useAppSelector((store) => store.user.userData);

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


  return (
    <>
      <h1>Bienvenue O'BG {pseudo} !</h1>
      <p>
        {' '}
        Pour obtenir une suggestion de livres, il faut connecter votre compte
        Spotify.
      </p>
      <Button>Ici !</Button>
    </>
  );
}
