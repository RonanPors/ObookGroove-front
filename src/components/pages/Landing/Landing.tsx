import { Button, ButtonContent, Grid, Header, Segment, MessageHeader, Message, Icon, MessageContent, Container, Image, GridRow, GridColumn, Input } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Landing.scss';
import { spotifyAuthorization } from '../../../store/reducers/booksReducer';
import Spotifylogo from '../../../assets/logo/svg/Spotify_logo_with_text.svg';
import Obglogo from '../../../assets/logo/svg/logo2_bleuvert.svg';
import illustration from '../../../assets/illustrations/jacket-livre/illustration-landing-page 1.svg';
import logoFulltext from '../../../assets/logo/svg/Obookgroove_logo_fulltext-gradient.svg'
import MediaQuery from 'react-responsive';


export default function Landing (){
  return (
    <>
      
        <MediaQuery minWidth={768}>
          <Grid id='landing__grid' centered columns={2} divided verticalAlign='middle'>

              <GridColumn id='landing__textblock' width={6} stretched padded>
                <GridRow id='landing__header' streteched>
                   <Image id='landing__title' src={logoFulltext} size='big' />
                </GridRow>
                <GridRow id='landing__headerh1' stretched>
                  <Header inverted as='h1'>Connectez vos univers musicaux et littéraires</Header>
                </GridRow>
                <GridRow>
                <Input fluid type='text' placeholder='Entez votre email' action>
                    <input />
                    <Button color='blue' type='submit'>S'inscrire</Button>
                </Input>
                </GridRow>
              </GridColumn>
              
              <GridColumn width={6} stretched>
                <Image id='landing__illustration' src={illustration} size='massive' />
              </GridColumn>

          </Grid>
        </MediaQuery>

        <MediaQuery maxWidth={767}>
          <Grid centered columns={1} divided verticalAlign='middle'>
            <GridRow stretched>
              <GridColumn width={16}>
              <Image id='landing__totle' src={logoFulltext} size='medium' />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={16}>
                <Image id='bookers__image' src={illustration} size='medium' />
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={16}>
              </GridColumn>
            </GridRow>
          </Grid>
        </MediaQuery>
      
    </>
  );
}

