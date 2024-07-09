import {
  Header,
  Form,
  Button,
  Segment,
  Image,
  FormField,
  Input,
  Icon,
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

        <Button color="teal" type="submit" fluid size="large">
          Envoyer votre e-mail
        </Button>
        {error !== '' && <p> {error}</p>}
      </Form>
    </Segment>
  );
}
