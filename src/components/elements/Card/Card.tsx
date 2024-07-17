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
  Container,
  Button,
  Radio

} from 'semantic-ui-react';

import { Book } from '../../../@types/book';
import BookShell from '../../../assets/logo/svg/bookshell 1.svg';
import BookShellActive from '../../../assets/logo/svg/toggle-on-favori.svg'
import placeholder from '../../../assets/logo/svg/logo2_blanc.svg';

type CardBookProps = {
  book: Book;
};

const cardStyle = {
  margin: 0,
  borderRadius: '1rem',
};

export default function CardBook({ book }: CardBookProps) {
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
          <div className='card__content__favori'>
            <Popup content='Ajouter à ma bibliothèque' trigger={ <Image floated="right" src={BookShell} />} />
          </div>
          <div className='card__content__favori'>
            <Popup content='Retirer de ma bibliothèque' trigger={ <Image floated="right" src={BookShellActive} />} />
          </div> 
          {/* <Button primary icon='favorite' /> */}
 
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
