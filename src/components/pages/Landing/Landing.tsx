import { useEffect, useRef } from 'react';
import {
  Button,
  Grid,
  Header,
  Image,
  GridRow,
  GridColumn,
  Input,
  Icon,
} from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { updateFieldCredentials } from '../../../store/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import './Landing.scss';
import illustration from '../../../assets/illustrations/jacket-livre/illustration-landing-page 1.svg';
import logoFulltext from '../../../assets/logo/svg/Obookgroove_logo_fulltext-gradient.svg';

export default function Landing() {
  const { email } = useAppSelector((store) => store.user.userData.credentials);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // met le focus sur le premier champ du form :
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/signup');
  };

  return (
    <>
      <MediaQuery minWidth={768}>
        <Grid
          id="landing__grid"
          centered
          columns={2}
          divided
          verticalAlign="middle"
        >
          <GridColumn id="landing__textblock" width={6} stretched padded>
            <GridRow id="landing__header" streteched>
              <Image id="landing__title" src={logoFulltext} size="massive" />
            </GridRow>
            <GridRow id="landing__header1" stretched>
              <Header inverted as="h1">
                Connectez vos univers musicaux et littéraires grâce à notre
                application&nbsp;!
              </Header>
            </GridRow>

            <GridRow>
              <Input iconPosition="left" fluid id="landing__input">
                <Icon name="at" />
                <input
                  ref={inputRef}
                  placeholder="Entrez votre adresse e-mail"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    dispatch(
                      updateFieldCredentials({
                        value: e.target.value,
                        field: 'email',
                      })
                    )
                  }
                />
              </Input>

              <Button
                color="teal"
                type="submit"
                fluid
                id="landing__button"
                onClick={handleClick}
              >
                Je m&apos;inscris et c&apos;est parti !
              </Button>
            </GridRow>
          </GridColumn>

          <GridColumn width={6} stretched>
            <Image id="landing__illustration" src={illustration} />
          </GridColumn>
        </Grid>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <Grid
          id="landing__grid"
          centered
          columns={1}
          divided
          verticalAlign="middle"
        >
          <GridColumn id="landing__textblock" width={16} stretched padded>
            <GridRow id="landing__header" streteched>
              <Image id="landing__title" src={logoFulltext} size="medium" />
            </GridRow>
            <GridRow id="landing__header1" stretched>
              <Header inverted as="h1">
                Connectez vos univers musicaux et littéraires grâce à notre
                application&nbsp;!
              </Header>
            </GridRow>
            <GridRow>
              <Input iconPosition="left" fluid id="landing__input">
                <Icon name="at" />
                <input
                  ref={inputRef}
                  placeholder="Entrez votre adresse e-mail"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    dispatch(
                      updateFieldCredentials({
                        value: e.target.value,
                        field: 'email',
                      })
                    )
                  }
                />
              </Input>

              <Button
                color="teal"
                type="submit"
                fluid
                id="landing__button"
                onClick={handleClick}
              >
                Je m&apos;inscris et c&apos;est parti !
              </Button>
            </GridRow>
          </GridColumn>

          <GridColumn width={16} centered id="landing__illustration">
            <Image src={illustration} />
          </GridColumn>
        </Grid>
      </MediaQuery>
    </>
  );
}
