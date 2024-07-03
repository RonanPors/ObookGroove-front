import {
  FormField,
  Button,
  Checkbox,
  Form,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './SignUp.scss';

export default function SignUp() {
  return (
    <Segment inverted className="Segment__SignUp">
      <Form inverted size="large" className="Form__SignUp">
        <Header inverted as="h1" className="h1__header">
          Créer un compte
        </Header>
        <FormField>
          <label htmlFor="email">Email</label>
          <input placeholder="email@domain.com" id="email" />
        </FormField>
        <FormField>
          <label htmlFor="pseudo">Pseudo</label>
          <input placeholder="Pseudo" id="pseudo" />
        </FormField>
        <FormField>
          <label htmlFor="phone-mobile">Numéro de téléphone mobile</label>
          <input placeholder="06 00 00 00 00" id="phone-mobile" />
        </FormField>
        <FormField>
          <label htmlFor="password">Mot de passe</label>
          <input placeholder=" xxxxxxx" id="password" />
        </FormField>
        <FormField>
          <label htmlFor="confirm-password">Confirmer votre mot de passe</label>
          <input placeholder="xxxxxxxx" id="confirm-password" />
        </FormField>
        <FormField>
          <Checkbox
            as={Link}
            to="/general-conditions-use"
            label="J'accepte les conditions d'utilisation"
          />
        </FormField>
        <Button type="submit">Créer un compte</Button>
      </Form>
    </Segment>
  );
}
