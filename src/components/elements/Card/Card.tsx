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
} from 'semantic-ui-react';

import Dune from '../../../assets/illustrations/jacket-livre/Dune.jpg';
import BookShell from '../../../assets/logo/svg/bookshell 1.svg';
import { Book } from '../../../@types/book';

type CardBookProps = {
  book: Book;
};

export default function CardBook({ book }: CardBookProps) {
  // const { user } = useUserByIdQuery(2);
  console.log(book);

  return (
    <div>
      <Card id="card__container" fluid>
        <Segment id="card__image" inverted>
          <Item align="centered">
            <ItemImage
              src={book.cover}
              wrapped
              ui={false}
              size="small"
              centered
            />
          </Item>
        </Segment>

        <CardContent>
          <div>
            <Image floated="right" size="mini" src={book.cover} />
          </div>
          <Header inverted color="grey" id="card_author" as="h1">
            {book.title}
          </Header>
          <Header inverted color="grey" as="h3">
            {book.author}
          </Header>
        </CardContent>

        <CardContent extra>
          <LabelGroup color="blue">
            <Label>{book.genre}</Label>
            {/* <Label>Aventure</Label>
            <Label>Drame</Label>
            <Label>Fantasy</Label> */}
          </LabelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
