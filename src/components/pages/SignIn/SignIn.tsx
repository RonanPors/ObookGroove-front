import {
  Grid,
  Header,
  Form,
  Button,
  Segment,
  Message,
  Image,
} from 'semantic-ui-react';
import './SignIn.scss';

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import logo from '../../../assets/logo/svg/logo2_vertbleu.svg';

import {
  signin,
  updateFieldCredentials,
} from '../../../store/reducers/userReducer';

export default function SignIn() {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((store) => store.user);
  const { email, password } = useAppSelector(
    (store) => store.user.userData.credentials
  );

  // pour redirect vers la page de books
  const { authSuccess } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authSuccess) {
      navigate('/member/books');
    }
  }, [authSuccess, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    dispatch(signin());
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
          <Image src={logo} /> Connectez-vous!
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

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Entrez votre mot de passe"
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
            <Button color="teal" type="submit" fluid size="large">
              Se connecter
            </Button>
            {error !== '' && <p> {error}</p>}
          </Segment>
        </Form>

        <Message>
          <Link to="/reset-password">Mot de passe oublié ? </Link>
        </Message>

        <Message>
          Pas encore de compte ? <Link to="/signup">Créer un compte </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
