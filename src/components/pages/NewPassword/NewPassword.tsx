import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import './NewPassword.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  newPassword,
  toggleIsSuccess,
  updateFieldCredentials,
  updateFieldUserData,
} from '../../../store/reducers/userReducer';

import logo from '../../../assets/logo/svg/logo2_vertbleu.svg';

export default function NewPassword() {
  const { loading, error, isSuccess } = useAppSelector((store) => store.user);
  const { password } = useAppSelector(
    (store) => store.user.userData.credentials
  );
  const { confirmPassword } = useAppSelector((store) => store.user.userData);

  const dispatch = useAppDispatch();

  // met le focus sur le premier champ du form :
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  // pour redirect vers la page de connexion en cas de succès
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleIsSuccess());
      navigate('/signin');
    }
  }, [isSuccess, dispatch, navigate]);

  // vérifie si un champ est vide :
  const emptyFieldInspector = password === '' || confirmPassword === '';
  // création de 2 états :
  const [hasError, setHasError] = useState(false);
  const [notSamePassword, setNotSamePassword] = useState(false);

  const { userId, resetToken } = useParams();
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
    dispatch(
      newPassword({ userId: userId ?? '', resetToken: resetToken ?? '' })
    );
  };
  return (
    <Segment inverted className="new-password">
      <Form
        inverted
        size="large"
        className="new-password__form"
        onSubmit={handleSubmit}
      >
        <Header
          inverted
          as="h1"
          className="h1 new-password__header"
          textAlign="center"
        >
          <MediaQuery minWidth={768}>
            <Image src={logo} />
          </MediaQuery>
          Réinitialiser votre mot de passe
        </Header>

        <h4>Étape 2/2</h4>

        <FormField className="new-password__field">
          <Input iconPosition="left">
            <Icon name="lock" />
            <input
              ref={inputRef}
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
          </Input>
        </FormField>

        <FormField className="new-password__field">
          <Input iconPosition="left">
            <Icon name="lock" />
            <input
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
          </Input>
        </FormField>

        {hasError && (
          <Message negative>Vous devez compléter les 2 champs</Message>
        )}

        {notSamePassword && (
          <Message negative>Les mots de passe ne sont pas identiques</Message>
        )}

        <Button
          color="teal"
          type="submit"
          fluid
          size="large"
          disabled={emptyFieldInspector}
        >
          Réinitialiser
        </Button>
        {error !== '' && <Message negative> {error}</Message>}
      </Form>
    </Segment>
  );
}
