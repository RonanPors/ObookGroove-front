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
  Segment
} from 'semantic-ui-react'

import Dune from '../../../assets/illustrations/jacket-livre/Dune.jpg';

export default function CardBook() {
    return (
   
    <Card className='card__'>
        <Segment inverted>
           <Image src={Dune} wrapped ui={false} size='tiny' centered />
        </Segment>
        <Segment inverted>
          <CardContent>
             <CardHeader inverted as='h3'>Dune</CardHeader>
               <CardMeta>
                 <span className='date'>Joined in 2015</span>
               </CardMeta>
             <CardDescription>
                Matthew is a musician living in Nashville.
             </CardDescription>
         </CardContent>

        </Segment>
    
        <CardContent extra>
          <a>
            <Icon name='user' />
               22 Friends
          </a>
        </CardContent>
    </Card>

 )
}
  


