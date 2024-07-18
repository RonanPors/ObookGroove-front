import './Card.scss';
import {
  Header,
  CardContent,
  Card,
  Image,
  Segment,
  Label,
  LabelGroup,
  Item,
  ItemImage,
  Popup,
} from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { Book } from '../../../@types/book';
import BookShell from '../../../assets/logo/svg/bookshell 1.svg';
import BookShellActive from '../../../assets/logo/svg/toggle-on-favori.svg';
import placeholder from '../../../assets/logo/svg/logo2_blanc.svg';
import {
  updateFavoriteBookState,
  updateFavoriteBook,
  toggleOpenModal,
} from '../../../store/reducers/booksReducer';

type CardBookProps = {
  book: Book;
};

const cardStyle = {
  margin: 0,
  borderRadius: '1rem',
};

export default function CardBook({ book }: CardBookProps) {
  const { id: userId } = useAppSelector((store) => store.user.userData);
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    dispatch(
      updateFavoriteBook({
        userId,
        bookId: book.id,
        isFavorite: !book.isFavorite,
      })
    );
    dispatch(updateFavoriteBookState({ bookId: book.id }));
  };

  return (
    <div>
      <Card id="card__container">
        <Segment id="card__image" inverted>
          <Item align="centered">
            <ItemImage
              id="card__image"
              fluid
              style={cardStyle}
              src={book.cover || placeholder}
              wrapped
              ui={false}
              size="tiny"
              centered
              onClick={() =>
                dispatch(toggleOpenModal({ idBookModal: book.id }))
              }
            />
          </Item>
        </Segment>

        <CardContent fluid>
          <Popup
            content={
              book.isFavorite
                ? 'Retirer de ma bibliothèque'
                : 'Ajouter à ma bibliothèque'
            }
            trigger={
              <Image
                floated="right"
                src={book.isFavorite ? BookShellActive : BookShell}
                onClick={handleToggleFavorite}
              />
            }
          />

          <Header inverted color="grey" id="card_author" as="h3">
            {book.title}
          </Header>
          <Header inverted color="grey" as="h4">
            {book.author}
          </Header>
        </CardContent>

        <CardContent extra>
          <LabelGroup>
            {book.genre &&
              book.genre.length > 0 &&
              book.genre.map((item: string) => (
                <Label id="card__label" key={item}>
                  {item}
                </Label>
              ))}
          </LabelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
