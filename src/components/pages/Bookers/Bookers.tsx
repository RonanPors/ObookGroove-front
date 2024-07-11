import {
  Button,
  ButtonContent,
  Grid,
  Header,
  Segment,
  Message,
  Icon,
  MessageContent,
  Container,
  Image,
  GridRow,
  GridColumn,
} from 'semantic-ui-react';
import { useEffect, useRef } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Bookers.scss';
import {
  getSpotifyToken,
  spotifyAuthorization,
} from '../../../store/reducers/booksReducer';
import illustration from '../../../assets/logo/svg/illustration-sync-accounts 1.svg';
import CardBook from '../../elements/Card/Card';
// essai graphql:
import { useUserByIdQuery } from '../../../hooks/graphql';

export default function Bookers() {
  const { pseudo } = useAppSelector((store) => store.user.userData);
  const { books } = useAppSelector((store) => store.books);

  // function dispatch(arg0: unknown): void {
  //   throw new Error('Function not implemented.');
  // }

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

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(spotifyAuthorization());
  };

  // pour récupérer les params de l'URI afin de faire une redirection
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  const state = queryParams.get('state');
  const count = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (count.current === 0 && code && state) {
      dispatch(getSpotifyToken({ code, state }));
      navigate('/member/books');
    }
    // obligé de passer par un compteur pour n'envoyer qu'une seule fois le dispatch du getSpotifyToken
    count.current += 1;
  }, [code, state, dispatch, navigate]);

  // console.log(books);

  // essai graphql pour afficher les infos de l'utilisateur :
  const { user, loading, error } = useUserByIdQuery(2);
  console.log(useUserByIdQuery(2));

  return (
    <Container className="bookers__container">
      {/* {console.log('bookers page', books)} */}
      {error && <p> Une erreur utilisateur</p>}
      <div>
        {loading && !error && <p>Chargement...</p>}
        {!loading && !error && <p>Bienvenue {user?.pseudo}</p>}
        <p>{user?.books[2].title}</p>
        {user?.books.map((book, i) => (
          <p key={i}>
            {book.title} {book.genre} {book.author}
          </p>
        ))}
      </div>

      {books &&
        books.length > 0 &&
        books.map((book, i) => <p key={i}>{book.artistName}</p>)}

      <Header
        className="bookers__header"
        inverted
        as="h1"
        size="huge"
        textAlign="left"
      >
        Bonjour O&apos;BG {pseudo} !
      </Header>

      {/*error !== '' && <Message negative> {error}</Message>*/}

      <Message
        icon
        id="bookers__message__success"
        compact
        color="green"
        size="small"
      >
        <Icon name="check circle" size="small" />
        <MessageContent>
          Félicitations, votre compte O'Book Groove a bien été créé !
        </MessageContent>
      </Message>

      <Message
        icon
        id="bookers__message__failed"
        compact
        color="red"
        size="small"
      >
        <Icon name="warning circle" size="small" />
        <MessageContent>
          Un problème est survenu lors de la création de votre compte !
        </MessageContent>
      </Message>

      <Segment id="bookers__content" inverted>
        <Header inverted size="large" as="h2">
          Associer votre compte Spotify à votre compte O&apos;Book Groove
        </Header>
        <MediaQuery minWidth={768}>
          <Grid centered columns={2} divided verticalAlign="middle">
            <GridRow stretched>
              <GridColumn width={6}>
                <Header inverted size="tiny" as="h4">
                  En associant vos comptes Spotify et O&apos;bookGroove vous
                  bénéficierez de suggestions de livres personnalisées et en
                  accord avec vos goûts musicaux
                </Header>
              </GridColumn>
              <GridColumn width={6}>
                <Image id="bookers__image" src={illustration} size="medium" />
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={12}>
                <Button
                  onClick={handleClick}
                  animated
                  inverted
                  size="large"
                  fluid
                >
                  <ButtonContent id="bookers__button" visible>
                    Associer mes comptes
                  </ButtonContent>
                  <ButtonContent hidden>
                    <Icon name="sync" />{' '}
                  </ButtonContent>
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </MediaQuery>

        <MediaQuery maxWidth={767}>
          <Grid centered columns={1} divided verticalAlign="middle">
            <GridRow stretched>
              <GridColumn width={16}>
                <Header inverted size="tiny" as="h4">
                  En associant vos comptes Spotify et ObookGroove vous
                  bénéficierez de suggestions de livres personnalisées et en
                  accord avec vos goûts musicaux
                </Header>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn width={16}>
                <Image id="bookers__image" src={illustration} size="medium" />
              </GridColumn>
            </GridRow>

            <GridRow stretched>
              <GridColumn width={16}>
                <Button
                  onClick={() => dispatch(spotifyAuthorization())}
                  animated
                  inverted
                  size="large"
                  fluid
                >
                  <ButtonContent id="bookers__button" visible>
                    Associer mes comptes
                  </ButtonContent>
                  <ButtonContent hidden>
                    <Icon name="sync" />{' '}
                  </ButtonContent>
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </MediaQuery>
      </Segment>

      <Grid>
        {user?.books.map((book, i) => (
          <GridColumn key={i} mobile={16} tablet={7} computer={5}>
            <Segment>
              <CardBook book={book} />
            </Segment>
          </GridColumn>
        ))}

        {/* <GridColumn mobile={16} tablet={7} computer={5}>
          <Segment>
            <CardBook />
          </Segment>
        </GridColumn>
        <GridColumn mobile={16} tablet={7} computer={5}>
          <Segment>
            <CardBook />
          </Segment>
        </GridColumn>
        <GridColumn mobile={16} tablet={7} computer={5}>
          <Segment>
            <CardBook />
          </Segment>
        </GridColumn>
        <GridColumn mobile={16} tablet={7} computer={5}>
          <Segment>
            <CardBook />
          </Segment>
        </GridColumn>
        <GridColumn mobile={16} tablet={7} computer={5}>
          <Segment>
            <CardBook />
          </Segment>
        </GridColumn> */}
      </Grid>
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
  );
}
