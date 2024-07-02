import { MenuItem, Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function MenuMobile() {
  return (
    <Menu inverted vertical fluid className="mobile__menu">
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
        <Button primary className="mobile__button button__primary text-chapo">
          Log In
        </Button>
      </MenuItem>
    </Menu>
  );
}
