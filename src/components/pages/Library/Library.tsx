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
      <section className='library__container'>
        <Header
          className="library__header"
          inverted
          as="h1"
          textAlign="center"
        >
          Bibliothèque
        </Header>
        <section className='wrapper'>
            {books.map((book: Book) => (     
                <CardBook book={book} key={book.isbn}/>
            ))}
        </section>  
      </section>
         
  );
}
