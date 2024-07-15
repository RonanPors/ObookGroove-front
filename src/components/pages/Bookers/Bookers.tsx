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
import { Key, useEffect, useRef } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Bookers.scss';
import {
  getSpotifyToken,
  spotifyAuthorization,
} from '../../../store/reducers/spotifyReducer';
import illustration from '../../../assets/logo/svg/illustration-sync-accounts 1.svg';
import CardBook from '../../elements/Card/Card';

// essai graphql:
import { useUserByIdQuery } from '../../../hooks/graphql';
import { Book } from '../../../@types/book';

export default function Bookers() {
  const { books } = useAppSelector((store) => store.books);
  console.log(document.cookie);
  const { id: userId } = useAppSelector((store) => store.user.userData);

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
  const { user, loading, error } = useUserByIdQuery(userId);

  return (
    <Container className="bookers__container">
      {/* {console.log('bookers page', books)} */}
      {error && <p> Une erreur utilisateur</p>}

      {books &&
        books.length > 0 &&
        books.map((book, i) => <p key={i}>{book.title}</p>)}

      <Header
        className="bookers__header"
        inverted
        as="h1"
        size="huge"
        textAlign="left"
      >
        {!loading && !error && <p>Bienvenue {user?.pseudo}</p>}
      </Header>

      {/*error !== '' && <Message negative> {error}</Message>*/}


     

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
        {user?.books.map((book: Book, i: Key ) => (
          <GridColumn key={i} mobile={16} tablet={7} computer={5}>
            <Segment>
              <CardBook book={book} />
            </Segment>
          </GridColumn>
        ))}
      </Grid>
    </Container>
  );
}
