import { Grid, Header, Form, Button, Segment, Image } from 'semantic-ui-react';
import './ResetPassword.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  resetPassword,
  updateFieldCredentials,
} from '../../../store/reducers/userReducer';
import logo from '../../../assets/logo/svg/logo2_bleuvert.svg';

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.user);
  const { email } = useAppSelector((store) => store.user.userData.credentials);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    dispatch(resetPassword());
  };
  return (
    <Grid
      className="signin"
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header
          color="black"
          as="h2"
          textAlign="center"
          className="signin__header"
        >
          <Image src={logo} /> Réinitialiser votre mot de passe
        </Header>

        <Form className="signin__form" size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Entrez votre adresse mail"
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

            <Button color="teal" type="submit" fluid size="large">
              Envoyer
            </Button>
            {error !== '' && <p> {error}</p>}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
