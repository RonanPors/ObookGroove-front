import { Button, ButtonContent, Divider, Header, Segment, MessageHeader, Message, Icon, MessageContent, Container } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Bookers.scss';
import { spotifyAuthorization } from '../../../store/reducers/booksReducer';

export default function Bookers() {
  const { pseudo } = useAppSelector((store) => store.user.userData);


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



  return (
    <Container> 
      <Segment id='bookers__segment' inverted >
       <Header className='bookers__header' inverted as='h1' textAlign='left'>
        Bonjour O'BG {pseudo} !
       </Header>
       <Message icon id='bookers__message' compact color='green' size='small'>
        <Icon name='check circle outline' size='small'/>
        <MessageContent>
            Votre compte a bien été créé !
        </MessageContent>
       </Message>
       
      </Segment>
      <Segment id='bookers__content' inverted>
        <Header inverted  size='medium' as='h3'>Rattachez votre compte Spotify</Header>
        <Header inverted  size='tiny' as='h5'>En associant vos comptes Spotif et ObookGroove vous bénéficierez de suggestions de livres personnalisées et en accord avec vos goûts musicaux 
        </Header>
      
        <Button animated inverted>
           <ButtonContent visible>Connect accounts</ButtonContent>
             <ButtonContent hidden>
             <Icon name='sync' />
           </ButtonContent>
        </Button>
      </Segment>
    </Container>
    
   
   
     
      

    

        // <h1>Bienvenue O'BG {pseudo} !</h1>
        // <h3>Votre compte a bien été créé (suite à la notif e-mail qui renvoie vers la confirm signup qu'on redirige ici)</h3>
        // {/*si c'est un signin on affiche que h1 si c'est un signup on affiche h2*/}
        // <p>
        //   {' '}
        //   Pour obtenir une suggestion de livres, il faut connecter votre compte
        //   Spotify.
        // </p>
        // <Button onClick={() => dispatch(spotifyAuthorization())}>Ici !</Button>
      

  ) 
    
  }

