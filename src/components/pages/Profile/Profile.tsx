import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  AccordionTitleProps,
  Button,
  Form,
  FormField,
  Icon,
  Input,
  Label,
  Radio,
  Segment,
} from 'semantic-ui-react';
import './Profile.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  updateFieldCredentials,
  updateFieldUserData,
} from '../../../store/reducers/userReducer';

export default function Profile() {
  // récupère les états stockés dans le store (redux) :
  // const { loading, error } = useAppSelector((store) => store.user);
  const { email, password } = useAppSelector(
    (store) => store.user.userData.credentials
  );
  const { pseudo, confirmPassword } = useAppSelector(
    (store) => store.user.userData
  );

  // permet de faire une action gérée dans le store (redux) :
  const dispatch = useAppDispatch();

  // permet d'utiliser l'accordéon de semantic-ui :
  const [activeIndex, setActiveIndex] = useState<string | number | undefined>(
    0
  );
  // met le focus sur le premier champ du form :
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  // toggle avec icon "eye" pour le mdp
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

  const handleClick = (
    event: React.MouseEvent,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    console.log(titleProps);

    setActiveIndex(newIndex);
  };

  return (
    <Segment inverted fluid className="profile">
      <Accordion styled inverted fluid className="profile__accordion">
        <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
          as="h1"
          className="profile__title profile__info--title"
          id="h4"
        >
          <Icon name="dropdown" />
          Mon profil
        </AccordionTitle>
        <AccordionContent
          active={activeIndex === 0}
          className="profile__content profile__info--content"
        >
          <Form inverted size="large" className="profile__info--form">
            <FormField className="profile__field profile__field--pseudo">
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

            <FormField className="profile__field profile__field--email">
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

            <Button
              primary
              fluid
              type="submit"
              className="profile__button profile__button--update"
            >
              Je modifie mon profil
            </Button>

            <Button
              primary
              fluid
              type="submit"
              className="profile__button profile__button-save"
            >
              Je sauvegarde mes informations
            </Button>
          </Form>
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
          as="h1"
          className="profile__title profile__password--title"
          id="h4"
        >
          <Icon name="dropdown" />
          Modifier mon mot de passe
        </AccordionTitle>
        <AccordionContent
          active={activeIndex === 1}
          className="profile__content profile__password--content"
        >
          <Form inverted size="large" className="profile__password--form">
            <FormField className="profile__field profile__field--actual-password">
              <label htmlFor="actual-password">Votre mot de passe actuel</label>
              <Input iconPosition="left">
                <Icon name="lock" />
                <input
                  placeholder="Votre mot de passe actuel"
                  id="actual-password"
                  type="password"
                  value={confirmPassword} // à changer en actualPassword
                  onChange={(e) =>
                    dispatch(
                      updateFieldUserData({
                        value: e.target.value,
                        field: 'confirmPassword', // à changer en actualPassword
                      })
                    )
                  }
                />
              </Input>
            </FormField>

            <FormField className="profile__field profile__field--new-password">
              <label htmlFor="password">Entrer un nouveau mot de passe</label>
              <Input iconPosition="left">
                <Icon name="lock" />
                <input
                  ref={passwordInputRef}
                  placeholder="Choisissez un mot de passe"
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
                <Button className="signup__field-eye" onClick={displayPassword}>
                  <Icon name="eye" />
                </Button>
              </Input>

              <Label pointing>
                Doit contenir au minimum 8 caractères dont&nbsp;: 1 symbole
                parmi !@#$%^&*, 1 chiffre entre 0 et 9, 1 minuscule et 1
                majuscule.
              </Label>
            </FormField>

            <FormField className="profile__field profile__field--confirm-password">
              <label htmlFor="confirm-password">
                Confirmer votre nouveau mot de passe
              </label>
              <Input iconPosition="left">
                <Icon name="lock" />
                <input
                  placeholder="Confirmer votre nouveau mot de passe"
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
              </Input>
            </FormField>

            <Button
              primary
              fluid
              type="submit"
              className="profile__button profile__button--post"
            >
              Je modifie mon mot de passe
            </Button>
          </Form>
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
          as="h2"
          className="profile__title profile__musical--title"
          id="h4"
        >
          <Icon name="dropdown" />
          Mes données musicales
        </AccordionTitle>
        <AccordionContent
          active={activeIndex === 2}
          className="profile__content profile__musical--content"
        >
          <p className="text-chapo">Compte Spotify</p> <Radio toggle />
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
          as="h2"
          className="profile__title profile__delete-account--title"
          id="h4"
        >
          <Icon name="dropdown" />
          Supprimer mon compte
        </AccordionTitle>
        <AccordionContent
          active={activeIndex === 3}
          className="profile__contente profile__delete-account-content"
        >
          <p className="text-chapo">
            La suppression de votre compte est définitive.
          </p>
          <p>
            {' '}
            Si vous supprimez votre compte O&apos;Book Groove, vos informations
            personnelles et l&apos;association à votre application musicale
            seront supprimées de notre base de données. Il vous faudra créer un
            nouveau compte si vous souhaitez utiliser O&apos;Book Groove de
            nouveau.
          </p>
          <Button
            negative
            fluid
            type="button"
            className="profile__delete-account--button"
          >
            Je supprime définitivement mon compte
          </Button>
        </AccordionContent>
      </Accordion>
    </Segment>
  );
}
