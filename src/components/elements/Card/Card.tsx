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
  Container

} from 'semantic-ui-react';

import Dune from '../../../assets/illustrations/jacket-livre/Dune.jpg';
import BookShell from '../../../assets/logo/svg/bookshell 1.svg';
import { Book } from '../../../@types/book';

type CardBookProps = {
  book: Book;
};

const cardStyle = {
  margin: 0,
  borderRadius: '1rem'
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
              src={book.cover}
              wrapped ui={false}
              size="tiny"
              centered
            />
            
          </Item>
        </Segment>

        <CardContent fluid>
          <a>
          <Image floated="right" src={BookShell} />
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
            {book.genre.map((item: String) => <Label id="card__label">{item}</Label>)}
          </LabelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
