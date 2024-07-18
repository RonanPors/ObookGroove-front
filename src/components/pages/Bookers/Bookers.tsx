import {
  Button,
  ButtonContent,
  Grid,
  Header,
  Segment,
  Icon,
  Container,
  Image,
  GridRow,
  GridColumn,
} from 'semantic-ui-react';
import './Bookers.scss';
import { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import illustration from '../../../assets/logo/svg/illustration-sync-accounts 1.svg';
// import refresh from '../../../assets/logo/svg/logo1_noir.svg';
import CardBook from '../../elements/Card/Card';

import { Book } from '../../../@types/book';
import {
  currentBooks,
  suggestBooks,
  getSpotifyToken,
  spotifyAuthorization,
} from '../../../store/reducers/booksReducer';

export default function Bookers() {
  const { books, error, loading, loadingSpotify, pseudo } = useAppSelector(
    (store) => store.books
  );
  const { id: userId } = useAppSelector((store) => store.user.userData);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(spotifyAuthorization());
  };

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
      {!error && (loading || loadingSpotify) && books.length === 0 && (
        <p>Patientez, nous traitons votre demande.</p>
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

          {/* <Grid>
            {books.map((book: Book) => (
              <GridColumn key={book.isbn} mobile={16} tablet={7} computer={5}>
                <Segment>
                  <CardBook book={book} />
                </Segment>
              </GridColumn>
            )
            )
            }
          </Grid> */}
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

          <p>
            Suite à cette erreur : {error}. Merci de vous reconnecter à votre
            compte Spotify.
          </p>
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
