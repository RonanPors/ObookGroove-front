import {
  FormField,
  Button,
  Checkbox,
  Form,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signup } from '../../../store/reducers/userReducer';

import './SignUp.scss';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((store) => store.user);

  const { email, password } = useAppSelector(
    (store) => store.user.userData.credentials
  );
  const { pseudo, confirmPassword, phoneNumber, cgu } = useAppSelector(
    (store) => store.user.userData
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    dispatch(signup());
  };

  return (
    <Segment inverted className="Segment__SignUp">
      <Form
        inverted
        size="large"
        className="Form__SignUp"
        onSubmit={handleSubmit}
      >
        <Header inverted as="h1" className="h1__header">
          Créer un compte
        </Header>

        <FormField>
          <label htmlFor="email">Email</label>
          <input
            placeholder="email@domain.com"
            id="email"
            type="email"
            value={email}
          />
        </FormField>

        <FormField>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            placeholder="Pseudo"
            id="pseudo"
            type="password"
            value={password}
          />
        </FormField>

        <FormField>
          <label htmlFor="phone-mobile">Numéro de téléphone mobile</label>
          <input
            placeholder="06 00 00 00 00"
            id="phone-mobile"
            type="text"
            value={phoneNumber}
          />
        </FormField>

        <FormField>
          <label htmlFor="password">Mot de passe</label>
          <input
            placeholder=" xxxxxxx"
            id="password"
            type="password"
            value={password}
          />
        </FormField>

        <FormField>
          <label htmlFor="confirm-password">Confirmer votre mot de passe</label>
          <input
            placeholder="xxxxxxxx"
            id="confirm-password"
            type="password"
            value={confirmPassword}
          />
        </FormField>

        <FormField>
          <Checkbox
            as={Link}
            to="/general-conditions-use"
            label="J'accepte les conditions d'utilisation"
          />
        </FormField>

        <Button type="submit">Créer un compte</Button>
        {error !== '' && <p> {error}</p>}
      </Form>
    </Segment>
  );
}
