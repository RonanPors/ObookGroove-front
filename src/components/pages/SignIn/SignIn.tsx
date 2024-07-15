import {
  Header,
  Form,
  Button,
  Segment,
  Message,
  Image,
  FormField,
  Input,
  Icon,
  Label,
} from 'semantic-ui-react';
import './SignIn.scss';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import logo from '../../../assets/logo/svg/logo2_vertbleu.svg';

import {
  signin,
  updateFieldCredentials,
} from '../../../store/reducers/userReducer';
// import Cookies from 'js-cookie';

export default function SignIn() {
  const { loading, error } = useAppSelector((store) => store.user);
  const { email, password } = useAppSelector(
    (store) => store.user.userData.credentials
  );

  // TODO pour vérifier les token (utilisable ?)
  // const { accessToken, refreshToken } = useAppSelector(
  //   (store) => store.user.userData
  // );

  // useEffect(() => {
  //   Cookies.set('accessToken', accessToken, { expires: 7, secure: false });
  //   Cookies.set('refreshToken', refreshToken, { expires: 7, secure: false });
  // }, [accessToken, refreshToken]);

  // pour redirect vers la page de books
  const dispatch = useAppDispatch();

  // met le focus sur le premier champ du form :
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  // pour redirect vers la page de books en cas de succès :
  const { authSuccess } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authSuccess) {
      navigate('/member/books');
    }
  }, [authSuccess, navigate]);

  // vérifie si un champ est vide :
  const emptyFieldInspector = email === '' || password === '';

  // création d'un état (sans redux):
  const [hasError, setHasError] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading || emptyFieldInspector) {
      setHasError(true);
      return;
    }
    dispatch(signin());
  };

  return (
    <Segment inverted className="signin">
      <Form
        inverted
        size="large"
        className="signin__form"
        onSubmit={handleSubmit}
      >
        <Header
          inverted
          as="h1"
          className="h1 signin__header"
          textAlign="center"
        >
          <MediaQuery minWidth={768}>
            <Image src={logo} />
          </MediaQuery>
          Connectez-vous !
        </Header>

        <FormField className="signin__field">
          <Input iconPosition="left">
            <Icon name="at" />
            <input
              ref={inputRef}
              placeholder="Entrez votre adresse e-mail"
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
        </FormField>

        <FormField className="signin__field">
          <Input icon iconPosition="left">
            <Icon name="lock" />
            <input
              placeholder="Entrez votre mot de passe"
              id="password"
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
          </Input>

          <Label pointing basic color="teal">
            Rappel : il doit contenir au minimum 8 caractères dont
            1&nbsp;symbole parmi !@#$%^&*, 1&nbsp;chiffre de 0 à 9,
            1&nbsp;minuscule et 1&nbsp;majuscule.
          </Label>
        </FormField>

        {hasError && (
          <Message negative>Vous devez compléter les 2 champs</Message>
        )}

        <Button
          color="teal"
          type="submit"
          fluid
          size="large"
          disabled={emptyFieldInspector}
        >
          Je me connecte
        </Button>
        {error !== '' && <Message negative> {error}</Message>}
      </Form>

      <Segment textAlign="center" className="signin__messages">
        <Message>
          <Link to="/reset-password">Mot de passe oublié ? </Link>
        </Message>

        <Message>
          Pas encore de compte&nbsp;? <Link to="/signup">Créer un compte </Link>
        </Message>
      </Segment>
    </Segment>
  );
}
