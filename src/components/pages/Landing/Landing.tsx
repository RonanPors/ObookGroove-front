import { Button, ButtonContent, Grid, Header, Segment, MessageHeader, Message, Icon, MessageContent, Container, Image, GridRow, GridColumn } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Landing.scss';
import { spotifyAuthorization } from '../../../store/reducers/booksReducer';
import Spotifylogo from '../../../assets/logo/svg/Spotify_logo_with_text.svg';
import Obglogo from '../../../assets/logo/svg/logo2_bleuvert.svg';
import illustration from '../../../assets/logo/svg/illustration-sync-accounts 1.svg';
import MediaQuery from 'react-responsive';
import CardBook from '../../elements/Card/Card';
export default function Landing (){
  return (
    <>
      <Segment id='bookers__content' inverted>
        <Header inverted size='large' as='h2'>Associer votre compte Spotify à votre compte O'Book Groove</Header>
        <MediaQuery minWidth={768}>
          <Grid centered columns={2} divided verticalAlign='middle'>
            <GridRow stretched>
              <GridColumn width={6}>
                <Header inverted size='tiny' as='h4'>En associant vos comptes Spotify et ObookGroove vous bénéficierez de suggestions de livres personnalisées et en accord avec vos goûts musicaux
                </Header>
              </GridColumn>
              <GridColumn width={6}>
                <Image id='bookers__image' src={illustration} size='medium' />
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={12}>
                <Button animated inverted size='large' fluid>
                  <ButtonContent id='bookers__button' visible>Associer mes comptes</ButtonContent>
                  <ButtonContent hidden>
                    <Icon name='sync' /> </ButtonContent>
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </MediaQuery>

        <MediaQuery maxWidth={767}>
          <Grid centered columns={1} divided verticalAlign='middle'>
            <GridRow stretched>
              <GridColumn width={16}>
                <Header inverted size='tiny' as='h4'>En associant vos comptes Spotify et ObookGroove vous bénéficierez de suggestions de livres personnalisées et en accord avec vos goûts musicaux
                </Header>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={16}>
                <Image id='bookers__image' src={illustration} size='medium' />
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={16}>
                <Button animated inverted size='large' fluid>
                  <ButtonContent id='bookers__button' visible>Associer mes comptes</ButtonContent>
                  <ButtonContent hidden>
                    <Icon name='sync' /> </ButtonContent>
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </MediaQuery>
      </Segment>
    </>
  );
}

