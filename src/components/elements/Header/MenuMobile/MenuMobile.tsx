import { MenuItem, Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';

import './MenuMobile.scss';

export default function MenuMobile() {
  const menuIsOpen = useAppSelector((state) => state.user.menuIsOpen);
  const navigate = useNavigate();
  const handleClick = () => {
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
      >
        Accueil
      </MenuItem>

      <MenuItem
        className="mobile__item text-chapo"
        name="Profil"
        as={NavLink}
        to="/member/profile"
      >
        Profil
      </MenuItem>

      <MenuItem
        className="mobile__item text-chapo"
        name="Bibliothèque"
        as={NavLink}
        to="/member/library"
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
