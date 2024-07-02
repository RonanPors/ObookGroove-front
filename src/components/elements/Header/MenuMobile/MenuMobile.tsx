import { MenuItem, Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function MenuMobile() {
  return (
    <Menu inverted vertical fluid className="mobile__menu">
      <NavLink to="/member/books">
        <MenuItem
          className="mobile__item text-chapo"
          link
          name="Accueil"
          as={NavLink}
          to="/member/books"
        >
          Accueil
        </MenuItem>
      </NavLink>

      <NavLink to="/member/profile">
        <MenuItem
          className="mobile__item text-chapo"
          link
          name="Profil"
          as={NavLink}
          to="/member/profile"
        >
          Profil
        </MenuItem>
      </NavLink>

      <NavLink to="/member/library">
        <MenuItem
          className="mobile__item text-chapo"
          link
          name="Bibliothèque"
          as={NavLink}
          to="/member/library"
        >
          Bibliothèque
        </MenuItem>
      </NavLink>

      <MenuItem>
        <Button primary className="mobile__button button__primary text-chapo">
          Log In
        </Button>
      </MenuItem>
    </Menu>
  );
}
