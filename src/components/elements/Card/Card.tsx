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
  Container,
} from 'semantic-ui-react';

import Dune from '../../../assets/illustrations/jacket-livre/Dune.jpg';
import BookShell from '../../../assets/logo/svg/bookshell 1.svg';
import { Book } from '../../../@types/book';

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
      <Card id="card__container" fluid>
        <Segment id="card__image" inverted>
          <Item align="centered">
            <Image
              class="class__image"
              fluid
              style={cardStyle}
              src={book.cover}
              wrapped
              ui={false}
              size="small"
              centered
            />
          </Item>
        </Segment>

        <CardContent fluid>
          <Image floated="right" src={BookShell} />
          <Header inverted color="grey" id="card_author" as="h2">
            {book.title}
          </Header>
          <Header inverted color="grey" as="h3">
            {book.author}
          </Header>
        </CardContent>

        <CardContent extra>
          <LabelGroup color="blue">
            {book.genre &&
              book.genre.length > 0 &&
              book.genre.map((item: string) => (
                <Label key={item}>{item}</Label>
              ))}
          </LabelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
