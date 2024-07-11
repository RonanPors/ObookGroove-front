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
// essai graphql:
import { useUserByIdQuery } from '../../../hooks/graphql';

export default function CardBook() {
  const { user } = useUserByIdQuery(2);
  return (
    <Card id="card__container" fluid>
      {/* {user?.books.map((book, i) => )} */}
      <Segment id="card__image" inverted>
        <Item align="centered">
          <ItemImage src={Dune} wrapped ui={false} size="small" centered />
        </Item>
      </Segment>

      <CardContent>
        <div>
          <Image floated="right" size="mini" src={BookShell} />
        </div>
        <Header inverted color="grey" id="card_author" as="h1">
          {user?.book.title}
        </Header>
        <Header inverted color="grey" as="h3">
          Franck Herbert
        </Header>
      </CardContent>

      <CardContent extra>
        <LabelGroup color="blue">
          <Label>Science Fiction</Label>
          <Label>Aventure</Label>
          <Label>Drame</Label>
          <Label>Fantasy</Label>
        </LabelGroup>
      </CardContent>
    </Card>
  );
}
