import { useEffect, useRef } from 'react';
import {
  Button,
  ButtonContent,
  Grid,
  Header,
  Segment,
  Icon,
  Image,
  GridRow,
  GridColumn,
  Message,
  MessageContent,
} from 'semantic-ui-react';
import './Bookers.scss';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Book } from '../../../@types/book';
import CardBook from '../../elements/Card/Card';
import {
  currentBooks,
  suggestBooks,
  getSpotifyToken,
  spotifyAuthorization,
} from '../../../store/reducers/booksReducer';
import BookDetailsModal from '../../elements/Modals/BookDetailsModal/BookDetailsModal';
import illustration from '../../../assets/logo/svg/illustration-sync-accounts 1.svg';
import Loading from '../../elements/Loading/Loading';

export default function Bookers() {
  const { books, error, loading, loadingSpotify, pseudo } = useAppSelector(
    (store) => store.books
  );
  const { id: userId } = useAppSelector((store) => store.user.userData);

  const dispatch = useAppDispatch();

  // action pour le bouton "associer Spotify"
  const handleClick = () => {
    dispatch(spotifyAuthorization());
  };

  // action pour le bouton "recharger les livres"
  const handleClickRefresh = () => {
    dispatch(suggestBooks({ id: userId }));
  };

  // pour récupérer les params de l'URI afin de faire une redirection
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  const state = queryParams.get('state');
  const count = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (count.current === 0 && code && state) {
      count.current += 1;
      dispatch(getSpotifyToken({ code, state }));
      navigate('/member/books');
    }
    dispatch(currentBooks({ id: userId, limit: 10 }));
    // obligé de passer par un compteur pour n'envoyer qu'une seule fois le dispatch du getSpotifyToken
    count.current += 1;
  }, [code, state, dispatch, navigate, userId]);

  return (
    <div className="bookers__container">
      <BookDetailsModal />

      {!error &&
        (loading ||
          (loadingSpotify && loadingSpotify && books.length === 0)) && (
          <Loading />
        )}

      {!loading && !loadingSpotify && !error && books.length === 0 && (
        <>
          <Header
            className="bookers__header"
            inverted
            as="h1"
            textAlign="center"
          >
            Bienvenue {pseudo}
          </Header>

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
                    <Image
                      id="bookers__image"
                      src={illustration}
                      size="medium"
                    />
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
                    <Image
                      id="bookers__image"
                      src={illustration}
                      size="medium"
                    />
                  </GridColumn>
                </GridRow>

                <GridRow stretched>
                  <GridColumn width={16}>
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
          </Segment>
        </>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <Header
            className="bookers__header"
            inverted
            as="h1"
            textAlign="center"
          >
            Bienvenue {pseudo}
          </Header>

          <MediaQuery minWidth={1224}>
            <Grid columns="five" padded>
              {books.map((book: Book) => (
                <GridColumn key={book.isbn}>
                  <CardBook book={book} />
                </GridColumn>
              ))}
            </Grid>
          </MediaQuery>

          <MediaQuery maxWidth={1223} minWidth={1024}>
            <Grid columns="four" padded>
              {books.map((book: Book) => (
                <GridColumn key={book.isbn}>
                  <CardBook book={book} />
                </GridColumn>
              ))}
            </Grid>
          </MediaQuery>

          <MediaQuery maxWidth={1023} minWidth={768}>
            <Grid columns="three" padded>
              {books.map((book: Book) => (
                <GridColumn key={book.isbn}>
                  <CardBook book={book} />
                </GridColumn>
              ))}
            </Grid>
          </MediaQuery>

          <MediaQuery maxWidth={767} minWidth={520}>
            <Grid columns="two" padded>
              {books.map((book: Book) => (
                <GridColumn key={book.isbn}>
                  <CardBook book={book} />
                </GridColumn>
              ))}
            </Grid>
          </MediaQuery>

          <MediaQuery maxWidth={519}>
            <Grid columns="one" padded>
              {books.map((book: Book) => (
                <GridColumn key={book.isbn}>
                  <CardBook book={book} />
                </GridColumn>
              ))}
            </Grid>
          </MediaQuery>

          <div className="bookers__container--refresh">
            <Button
              onClick={handleClickRefresh}
              className="bookers__refresh"
              circular
              icon="refresh"
            />
          </div>
        </>
      )}

      {error && (
        <>
          <Header
            className="bookers__header"
            inverted
            as="h1"
            textAlign="center"
          >
            Bienvenue {pseudo}
          </Header>
          <Message
            icon
            id="bookers__message__failed"
            compact
            color="red"
            size="small"
          >
            <Icon name="check circle" size="small" />
            <MessageContent>
              Suite à cette erreur : {error}. Merci d&apos;associer à nouveau
              votre compte Spotify.
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
                    <Image
                      id="bookers__image"
                      src={illustration}
                      size="medium"
                    />
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
                    <Image
                      id="bookers__image"
                      src={illustration}
                      size="medium"
                    />
                  </GridColumn>
                </GridRow>

                <GridRow stretched>
                  <GridColumn width={16}>
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
                      <ButtonContent hidden size="large">
                        <Icon name="sync" />{' '}
                      </ButtonContent>
                    </Button>
                  </GridColumn>
                </GridRow>
              </Grid>
            </MediaQuery>
          </Segment>
        </>
      )}
    </div>
  );
}
