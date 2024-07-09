import React from 'react'
import './Card.scss'
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
  Segment,
  Label, 
  LabelGroup, 
  Item, 
  ItemImage
} from 'semantic-ui-react'

import Dune from '../../../assets/illustrations/jacket-livre/Dune.jpg';

export default function CardBook() {
    return (
   
    <Card id='card__container' fluid>
        <Segment id='card__image' inverted>
            <Item align='centered'>
              <ItemImage src={Dune} wrapped ui={false} size='small' centered />
            </Item>
        </Segment>
        <Segment inverted>
          <CardContent>
             <CardHeader inverted as='h3'>Dune</CardHeader>
             <CardHeader inverted as='h4'>Franck Herbert</CardHeader>     
         </CardContent>
        </Segment>
    
        <CardContent extra>
            <LabelGroup color='blue'>
              <Label>
                Science Fiction
              </Label>
              <Label>
                Science Fiction
              </Label>
              <Label>
                Science Fiction
              </Label>
              <Label>
                Science Fiction
              </Label>
              <Label>
                Science Fiction
              </Label>
            </LabelGroup>
      
        </CardContent>
    </Card>

 )
}
  


