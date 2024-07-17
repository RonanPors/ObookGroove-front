import React from 'react';
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
  Container

} from 'semantic-ui-react';

import BookShell from '../../../assets/logo/svg/bookshell 1.svg';
import { Book } from '../../../@types/book';
import placeholder from '../../../assets/logo/svg/logo2_blanc.svg';

type CardBookProps = {
  book: Book;
};

const cardStyle = {
  margin: 0,
  borderRadius: '1rem',
};

export default function CardBook({ book }: CardBookProps) {
  // const { user } = useUserByIdQuery(2);
  // console.log(book.genre);

  return (
    <div>
      <Card id="card__container">
        <Segment id="card__image" inverted>
          <Item align="centered">
            
            <ItemImage id="card__image" fluid
             style={cardStyle}
              src={ book.cover || placeholder }
              wrapped ui={false}
              size="tiny"
              centered
            />
            
          </Item>
        </Segment>

        <CardContent fluid>
          <a>
            <Popup content='Ajouter à ma bibliothèque' trigger={ <Image floated="right" src={BookShell} />} />
          </a>
          
          
          <Header inverted color="grey" id="card_author" as="h2" >
            {book.title}
          </Header>
          <Header inverted color="grey" >
            {book.author}
          </Header>
        </CardContent>

        <CardContent extra>
          <LabelGroup >
            {book.genre &&
              book.genre.length > 0 &&
              book.genre.map((item: string) => (
                <Label id="card__label" key={item}>{item}</Label>
              ))}
          </LabelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
