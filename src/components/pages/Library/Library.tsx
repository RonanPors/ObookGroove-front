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
  Loader,
} from 'semantic-ui-react';
import './Library.scss';
import { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import CardBook from '../../elements/Card/Card';
import FailedMessage from '../../elements/Messages/FailedMessage/FailedMessage';

import { Book } from '../../../@types/book';
import {
  favoriteBooks,
} from '../../../store/reducers/booksReducer';

export default function Library() {
  const { books, error, loading, pseudo } = useAppSelector(
    (store) => store.books
  );
  const { id: userId } = useAppSelector((store) => store.user.userData);

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(favoriteBooks({ id: userId }));
  }, [dispatch, userId]);

return (
    
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

      </>
  );
}
