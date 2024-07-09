import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import {
  FormField,
  Button,
  Checkbox,
  Form,
  Image,
  Segment,
  Header,
  Icon,
  Input,
  Label,
  Message,
} from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  signup,
  updateFieldCredentials,
  updateFieldUserData,
} from '../../../store/reducers/userReducer';

import './SignUp.scss';
import logo from '../../../assets/logo/svg/logo2_vertbleu.svg';

export default function SignUp() {
  // utilisation de captcha
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { loading, error } = useAppSelector((store) => store.user);
  const { email, password } = useAppSelector(
    (store) => store.user.userData.credentials
  );
  const { pseudo, confirmPassword } = useAppSelector(
    (store) => store.user.userData
  );

  const dispatch = useAppDispatch();

  const [cgu, setCGU] = useState(false);
  const onChangeCGU = (event: React.FormEvent<HTMLDivElement>) => {
    setCGU(!event.currentTarget.classList.contains('checked'));
  };

  // met le focus sur le premier champ du form :
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  const [hasError, setHasError] = useState(false);
  const [notSamePassword, setNotSamePassword] = useState(false);

  const emptyFieldInspector =
    !cgu ||
    pseudo === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading || emptyFieldInspector) {
      setHasError(true);
      return;
    }
    if (password !== confirmPassword) {
      setNotSamePassword(true);
      return;
    }
    recaptchaRef.current.execute();
    dispatch(signup());

    // TODO message toaster : "Consulter vos mails pour valider votre inscription"
  };

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const displayPassword = () => {
    if (passwordInputRef.current !== null) {
      if (passwordInputRef.current.type === 'password') {
        passwordInputRef.current.type = 'text';
      } else {
        passwordInputRef.current.type = 'password';
      }
    }
  };
  return (
    <Segment inverted className="signup">
      <Form
        inverted
        size="large"
        className="signup__form"
        onSubmit={handleSubmit}
      >
        <Header
          inverted
          as="h1"
          className="h1 signup__header"
          textAlign="center"
        >
          <MediaQuery minWidth={768}>
            <Image src={logo} />
          </MediaQuery>
          Créer son compte
        </Header>

        <FormField className="signup__field">
          <label htmlFor="pseudo">Pseudo</label>
          <Input iconPosition="left">
            <Icon name="user" />
            <input
              ref={inputRef}
              placeholder="Pseudo"
              id="pseudo"
              type="text"
              value={pseudo}
              onChange={(e) =>
                dispatch(
                  updateFieldUserData({
                    value: e.target.value,
                    field: 'pseudo',
                  })
                )
              }
            />
          </Input>
        </FormField>

        <FormField className="signup__field">
          <label htmlFor="email">Email</label>
          <Input iconPosition="left">
            <Icon name="at" />
            <input
              placeholder="email@domain.com"
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
        </FormField>

        <FormField className="signup__field">
          <label htmlFor="password">Mot de passe</label>
          <Input icon>
            <input
              ref={passwordInputRef}
              placeholder="· · · · · · · ·"
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
            <Button onClick={displayPassword}>
              <Icon name="eye" />
            </Button>
          </Input>
          <Label pointing>
            Doit contenir au minimum 8 caractères dont&nbsp;: 1 symbole parmi
            !@#$%^&*, 1 chiffre, 1 minuscule et 1 majuscule.
          </Label>
        </FormField>

        <FormField className="signup__field">
          <label htmlFor="confirm-password">Confirmer votre mot de passe</label>
          <input
            placeholder="· · · · · · · ·"
            id="confirm-password"
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
        </FormField>

        <FormField className="signup__field">
          <Checkbox
            onChange={onChangeCGU}
            label={
              <label>
                J&apos;accepte{' '}
                <Link to="/general-conditions-use">
                  les conditions d&apos;utilisation
                </Link>
              </label>
            }
          />
        </FormField>

        {hasError && (
          <Message negative>
            Vous devez compléter tous les champs et accepter les conditions
            d&apos;utilisation
          </Message>
        )}

        {notSamePassword && (
          <Message negative>Les mots de passe ne sont pas identiques</Message>
        )}

        {error !== '' && <Message negative> {error}</Message>}

        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          ref={recaptchaRef}
          size="invisible"
        />
        <Button primary fluid type="submit" disabled={emptyFieldInspector}>
          Je crée mon compte
        </Button>
      </Form>
    </Segment>
  );
}
