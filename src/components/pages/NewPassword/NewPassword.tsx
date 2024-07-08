import { Grid, Header, Form, Button, Segment, Image } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import './NewPassword.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  newPassword,
  updateFieldCredentials,
  updateFieldUserData,
} from '../../../store/reducers/userReducer';

import logo from '../../../assets/logo/svg/logo2_noir.svg';

export default function NewPassword() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.user);
  const { confirmPassword } = useAppSelector((store) => store.user.userData);
  const { password } = useAppSelector(
    (store) => store.user.userData.credentials
  );
  const { userId, resetToken } = useParams();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    dispatch(
      newPassword({ userId: userId ?? '', resetToken: resetToken ?? '' })
    );
  };
  return (
    <Grid
      className="new-password"
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header
          color="black"
          as="h2"
          textAlign="center"
          className="new-password__header"
        >
          <Image src={logo} /> Réinitialiser votre mot de passe
        </Header>
        <Form
          className="new-password__form"
          size="large"
          onSubmit={handleSubmit}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Entrez votre nouveau mot de passe"
              type="password"
              value={password}
              onChange={(e) =>
                dispatch(
                  updateFieldCredentials({
                    value: e.target.value,
                    field: 'password',
                  })
                )
              }
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirmer votre nouveau mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                dispatch(
                  updateFieldUserData({
                    value: e.target.value,
                    field: 'confirmPassword',
                  })
                )
              }
            />
            <Button color="teal" type="submit" fluid size="large">
              Réinitialiser
            </Button>
            {error !== '' && <p> {error}</p>}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
