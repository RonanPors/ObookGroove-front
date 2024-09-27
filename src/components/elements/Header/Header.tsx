import { NavLink } from 'react-router-dom';
import './Header.scss';
import MediaQuery from 'react-responsive';
import { MenuItem, Menu, Segment, Button } from 'semantic-ui-react';
import { JSX } from 'react/jsx-runtime';
import { useAppSelector } from '../../../hooks/redux';
import Burger from './Burger/Burger';
import logo from '../../../assets/logo/svg/logo2_bleuvert.svg';

function Header() {
  const { isLogged } = useAppSelector((store) => store.user);

  let menuContextual: JSX.Element;

  if (isLogged) {
    menuContextual = (
      <Menu inverted pointing secondary stackable className="header__menu">
        <MenuItem
          className="header__item text-chapo"
          name="Accueil"
          as={NavLink}
          to="/member/books"
        >
          Accueil
        </MenuItem>

        <MenuItem
          className="header__item text-chapo"
          name="Bibliothèque"
          as={NavLink}
          to="/member/library"
        >
          Bibliothèque
        </MenuItem>

        <MenuItem
          className="header__item text-chapo"
          name="Profil"
          as={NavLink}
          to="/member/profile"
        >
          Profil
        </MenuItem>

        <MenuItem>
          <Button
            primary
            className="header__button button__primary text-chapo"
            as={NavLink}
            to="/logout"
          >
            Se déconnecter
          </Button>
        </MenuItem>
      </Menu>
    );
  } else {
    menuContextual = (
      <Menu inverted pointing secondary stackable className="header__menu">
        <MenuItem as={NavLink} to="/signin">
          <Button primary className="header__button button__primary text-chapo">
            Se connecter
          </Button>
        </MenuItem>
      </Menu>
    );
  }

  return (
    <Segment inverted className="header">
      <Segment inverted className="header__container">
        <NavLink className="header__logo" to={isLogged ? '/member/books' : '/'}>
          <img className="header__img" src={logo} alt="logo" />
        </NavLink>

        <MediaQuery minWidth={768}>{menuContextual}</MediaQuery>
        <MediaQuery maxWidth={767}>
          {isLogged ? <Burger /> : menuContextual}
        </MediaQuery>
      </Segment>
    </Segment>
  );
}

export default Header;
