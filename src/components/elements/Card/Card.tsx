import React from 'react'
import './Card.scss'
import {
  CardMeta,
  CardHeader,
  Header,
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
import BookShell from '../../../assets/logo/svg/bookshell 1.svg'

export default function CardBook() {
    return (
   
    <Card id='card__container' fluid>
        <Segment id='card__image' inverted>
            <Item align='centered'>
              <ItemImage src={Dune} wrapped ui={false} size='small' centered />
            </Item>
        </Segment>
        <Icon >
            
        </Icon>
        {/* <Segment inverted> */}
          <CardContent>
             <a>
               <Image floated='right' size='mini' src={BookShell} />
             </a>
             <Header inverted color='grey' id='card_author' as='h1'>Dune</Header>
             <Header inverted color='grey' as='h3'>Franck Herbert</Header>  
         </CardContent>
        {/* </Segment> */}
    
        <CardContent extra>
            <LabelGroup color='blue'>
              <Label>
                Science Fiction
              </Label>
              <Label>
                Aventure
              </Label>
              <Label>
                Drame
              </Label>
              <Label>
                Fantasy
              </Label>
            </LabelGroup>
        </CardContent>
    </Card>

 )
}
  


