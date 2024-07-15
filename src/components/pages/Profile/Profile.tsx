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
          className="profile__title"
          id="h3"
        >
          <Icon name="dropdown" />
          Mon profil
        </AccordionTitle>
        <AccordionContent active={activeIndex === 0}>
          <Form inverted size="large" className="signup__form">
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

            <Button primary fluid type="submit" className="signup__button">
              Je modifie mon profil
            </Button>
          </Form>
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
          as="h1"
          className="profile__title"
          id="h3"
        >
          <Icon name="dropdown" />
          Modifier mon mot de passe
        </AccordionTitle>
        <AccordionContent active={activeIndex === 1}>
          <Form inverted size="large" className="signup__form">
            <FormField className="signup__field">
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
            <FormField className="signup__field">
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

            <FormField className="signup__field">
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

            <Button primary fluid type="submit" className="signup__button">
              Je modifie mon mot de passe
            </Button>
          </Form>
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
          as="h2"
          className="profile__title"
          id="h3"
        >
          <Icon name="dropdown" />
          Mes données musicales
        </AccordionTitle>
        <AccordionContent active={activeIndex === 2}>
          <p>
            There are many breeds of dogs. Each breed varies in size and
            temperament. Owners often select a breed of dog that they find to be
            compatible with their own lifestyle and desires from a companion.
          </p>
        </AccordionContent>

        <AccordionTitle
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
          as="h2"
          className="profile__title"
          id="h3"
        >
          <Icon name="dropdown" />
          Supprimer mon compte
        </AccordionTitle>
        <AccordionContent active={activeIndex === 3}>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </AccordionContent>
      </Accordion>
    </Segment>
  );
}
