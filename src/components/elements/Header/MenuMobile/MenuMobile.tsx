import { MenuItem, Menu, Button } from 'semantic-ui-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import './MenuMobile.scss';
import { toggleMenu } from '../../../../store/reducers/userReducer';

export default function MenuMobile() {
  const menuIsOpen = useAppSelector((state) => state.user.menuIsOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(toggleMenu());
    navigate('/signin');
  };

  return (
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
        name="Profil"
        as={NavLink}
        to="/member/profile"
        onClick={() => dispatch(toggleMenu())}
      >
        Profil
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

      <MenuItem>
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
