import { MenuItem, Menu, Segment, Button } from 'semantic-ui-react';
import { NavLink, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import logo from '../../../assets/logo/svg/logo2_bleuvert.svg';
import './Header.scss';
import Burger from './Burger/Burger';

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <Segment inverted className="header">
      <Segment inverted className="header__container">
        <NavLink className="header__logo" to="/member/books">
          <img className="header__img" src={logo} alt="logo" />
        </NavLink>

        <MediaQuery minWidth={768}>
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
              name="Profil"
              as={NavLink}
              to="/member/profile"
            >
              Profil
            </MenuItem>

            <MenuItem
              className="header__item text-chapo"
              name="Bibliothèque"
              as={NavLink}
              to="/member/library"
            >
              Bibliothèque
            </MenuItem>

            <MenuItem as={NavLink} to="/signin">
              <Button
                primary
                className="header__button button__primary text-chapo"
                onClick={handleClick}
              >
                Se connecter
              </Button>
            </MenuItem>
          </Menu>
        </MediaQuery>

        <Burger />
      </Segment>
    </Segment>
  );
}

export default Header;
