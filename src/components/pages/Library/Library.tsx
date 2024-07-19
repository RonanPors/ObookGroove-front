import { Header } from 'semantic-ui-react';
import './Library.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Book } from '../../../@types/book';
import CardBook from '../../elements/Card/Card';
import { favoriteBooks } from '../../../store/reducers/booksReducer';

export default function Library() {
  const { books } = useAppSelector((store) => store.books);
  const { id: userId } = useAppSelector((store) => store.user.userData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(favoriteBooks({ id: userId }));
  }, [dispatch, userId]);

  return (
    <section className="library__container">
      <Header className="library__header" inverted as="h1" textAlign="center">
        Bibliothèque
      </Header>

      <section className="library__wrapper">
        {books.map((book: Book) => (
          <CardBook book={book} key={book.isbn} />
        ))}
      </section>
    </section>
  );
}
