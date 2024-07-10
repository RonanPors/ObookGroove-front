import { useEffect, useRef, useState } from 'react';
import {
  Header,
  Form,
  Button,
  Segment,
  Image,
  FormField,
  Input,
  Icon,
  Message,
} from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import './ResetPassword.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  resetPassword,
  updateFieldCredentials,
} from '../../../store/reducers/userReducer';
import logo from '../../../assets/logo/svg/logo2_bleuvert.svg';

export default function ResetPassword() {
  const { loading, error } = useAppSelector((store) => store.user);
  const { email } = useAppSelector((store) => store.user.userData.credentials);

  const dispatch = useAppDispatch();

  // met le focus sur le champ du form :
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  // vérifie si un champ est vide :
  const emptyFieldInspector = email === '';
  // création d'un état :
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading || emptyFieldInspector) {
      setHasError(true);
      return;
    }
    dispatch(resetPassword());
  };
  return (
    <Segment inverted className="reset-password">
      <Form
        inverted
        size="large"
        className="reset-password__form"
        onSubmit={handleSubmit}
      >
        <Header
          inverted
          as="h1"
          className="h1 reset-password__header"
          textAlign="center"
        >
          <MediaQuery minWidth={768}>
            <Image src={logo} />
          </MediaQuery>
          Réinitialiser votre mot de passe
        </Header>
        <h4>Étape 1/2</h4>
        <FormField className="reset-password__field">
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
          Envoyer votre e-mail
        </Button>
        {error !== '' && <Message negative> {error}</Message>}
      </Form>
    </Segment>
  );
}
