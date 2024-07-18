import { NavLink } from 'react-router-dom';
import './MenuMobile.scss';
import { MenuItem, Menu, Button } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { toggleMenu } from '../../../../store/reducers/userReducer';

export default function MenuMobile() {
  const menuIsOpen = useAppSelector((state) => state.user.menuIsOpen);
  const { isLogged } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  let menuContextual: JSX.Element;

  if (isLogged) {
    menuContextual = (
      <Menu
        inverted
        vertical
        fluid
        className={menuIsOpen ? 'mobile__menu is-open' : 'mobile__menu'}
      >
        <MenuItem
          className="mobile__item text-chapo"
          name="Accueil"
          as={NavLink}
          to="/member/books"
          onClick={() => dispatch(toggleMenu())}
        >
          Accueil
        </MenuItem>

        <MenuItem
          className="mobile__item text-chapo"
          name="Bibliothèque"
          as={NavLink}
          to="/member/library"
          onClick={() => dispatch(toggleMenu())}
        >
          Bibliothèque
        </MenuItem>

        <MenuItem
          className="mobile__item text-chapo"
          name="Profil"
          as={NavLink}
          to="/member/profile"
          onClick={() => dispatch(toggleMenu())}
        >
          Profil
        </MenuItem>

        <MenuItem as={NavLink} to="/logout">
          <Button
            primary
            className="mobile__button button__primary text-chapo"
            onClick={handleClick}
          >
            Se déconnecter
          </Button>
        </MenuItem>
      </Menu>
    );
  } else {
    menuContextual = (
      <Menu
        inverted
        vertical
        fluid
        className={menuIsOpen ? 'mobile__menu is-open' : 'mobile__menu'}
      >
        <MenuItem as={NavLink} to="/signin">
          <Button
            primary
            className="mobile__button button__primary text-chapo"
            onClick={handleClick}
          >
            Se connecter
          </Button>
        </MenuItem>
      </Menu>
    );
  }

  return <>{menuContextual}</>;
}
