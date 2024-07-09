import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.user);

  const { email, password } = useAppSelector(
    (store) => store.user.userData.credentials
  );
  const { pseudo, confirmPassword } = useAppSelector(
    (store) => store.user.userData
  );

  const navigate = useNavigate();

  // utilisation de captcha
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    recaptchaRef.current.execute();
    dispatch(signup());
    // redirection vers la landing page
    // TODO message toaster : "Consulter vos mails pour valider votre inscription"
    navigate('/');
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
            <Icon name="eye" />
          </Input>
          <Label pointing>
            Doit contenir au minimum : 1 minuscule, 1 majuscule, !*$%^@ et 8
            caractères.
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

        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          ref={recaptchaRef}
          size="invisible"
        />
        <Button primary fluid type="submit">
          Je crée mon compte
        </Button>
        {error !== '' && <p> {error}</p>}
      </Form>
    </Segment>
  );
}
