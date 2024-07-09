import { Button, ButtonContent, Grid, Header, Segment, MessageHeader, Message, Icon, MessageContent, Container, Image, GridRow, GridColumn } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Bookers.scss';
import { spotifyAuthorization } from '../../../store/reducers/booksReducer';
import Spotifylogo from '../../../assets/logo/svg/Spotify_logo_with_text.svg';
import Obglogo from '../../../assets/logo/svg/logo2_bleuvert.svg';
import illustration from '../../../assets/logo/svg/illustration-sync-accounts 1.svg';
import MediaQuery from 'react-responsive';



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
    <Container className='bookers__container'>

      {/* <Segment id='bookers__segment' inverted > */}
       <Header className='bookers__header' inverted as='h1' size='huge' textAlign='left'>
        Bonjour O'BG {pseudo} !
       </Header>
       <Message icon id='bookers__message__success' compact color='green' size='small'>
        <Icon name='check circle' size='small'/>
        <MessageContent>
            Votre compte O'Book Groove a bien été créé !
        </MessageContent>
       </Message> 
       <Message icon id='bookers__message__failed' compact color='red' size='small'>
        <Icon name='warning circle' size='small'/>
        <MessageContent>
            Un problème est survenu lors de la création de votre compte !
        </MessageContent>
       </Message>
      {/* </Segment> */}

      <Segment id='bookers__content' inverted>
        <Header inverted  size='large' as='h2'>Associer votre compte Spotify</Header>
        <MediaQuery minWidth={768}>
          <Grid centered columns={2} divided verticalAlign='middle'>
            <GridRow stretched>
              <GridColumn width={6}>
                <Header inverted  size='tiny' as='h4'>En associant vos comptes Spotify et ObookGroove vous bénéficierez de suggestions de livres personnalisées et en accord avec vos goûts musicaux 
                </Header>
              </GridColumn>
              <GridColumn width={6}>
                <Image id='bookers__image' src={illustration} size='medium' />
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={12}>
                  <Button onClick={() => dispatch(spotifyAuthorization())} animated inverted size='large' fluid>
                    <ButtonContent id='bookers__button' visible>Associer mes comptes</ButtonContent>
                     <ButtonContent hidden>
                    <Icon name='sync' /> </ButtonContent>
                  </Button>
              </GridColumn>
            </GridRow>
         </Grid>
        </MediaQuery>

        <MediaQuery maxWidth={767}>
          <Grid centered columns={1} divided verticalAlign='middle'>
            <GridRow stretched>
              <GridColumn width={16}>
                <Header inverted  size='tiny' as='h4'>En associant vos comptes Spotify et ObookGroove vous bénéficierez de suggestions de livres personnalisées et en accord avec vos goûts musicaux 
                </Header>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={16}>
                <Image id='bookers__image' src={illustration} size='medium' />
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={16}>
                  <Button onClick={() => dispatch(spotifyAuthorization())} animated inverted size='large' fluid>
                    <ButtonContent id='bookers__button' visible>Associer mes comptes</ButtonContent>
                     <ButtonContent hidden>
                    <Icon name='sync' /> </ButtonContent>
                  </Button>
              </GridColumn>
            </GridRow>
         </Grid>
        </MediaQuery>
         
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

