<<<<<<< HEAD
// import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useRef } from 'react';
=======
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
>>>>>>> 69dea02d73d853a081597f3ab6f08228df5474e4
import { Link, useNavigate } from 'react-router-dom';
import {
  FormField,
  Button,
  Checkbox,
  Form,
  Image,
  Segment,
  Header,
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
  const { pseudo, confirmPassword, phoneNumber } = useAppSelector(
    (store) => store.user.userData
  );

  const navigate = useNavigate();

  // utilisation de captcha
  // const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    // recaptchaRef.current.execute();
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
        <Header inverted as="h1" className="h1 signup__header">
          <Image src={logo} />
          Créer un compte
        </Header>

        <FormField>
          <label htmlFor="email">Email</label>
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
        </FormField>

        <FormField>
          <label htmlFor="pseudo">Pseudo</label>
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
        </FormField>

        <FormField>
          <label htmlFor="phone-mobile">Numéro de téléphone mobile</label>
          <input
            placeholder="06 00 00 00 00"
            id="phone-mobile"
            type="text"
            value={phoneNumber}
            onChange={(e) =>
              dispatch(
                updateFieldUserData({
                  value: e.target.value,
                  field: 'phoneNumber',
                })
              )
            }
          />
        </FormField>

        <FormField>
          <label htmlFor="password">Mot de passe</label>
          <input
            placeholder=" xxxxxxx"
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
        </FormField>

        <FormField>
          <label htmlFor="confirm-password">Confirmer votre mot de passe</label>
          <input
            placeholder="xxxxxxxx"
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

        <FormField>
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

        {/* <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          ref={recaptchaRef}
          size="invisible"
        /> */}
        <Button type="submit">Créer un compte</Button>
        {error !== '' && <p> {error}</p>}
      </Form>
    </Segment>
  );
}
