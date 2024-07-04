import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/logo/svg/logo2_blanc.svg';

import './Footer.scss';

export default function Footer() {
  return (
    <Segment inverted className="footer ">
      <Menu stackable inverted pointing secondary className="footer__menu">
        <MenuItem
          className="footer__logo"
          name="logo"
          as={NavLink}
          to="/member/books"
        >
          <img className="footer__img" src={logo} alt="logo" />
        </MenuItem>

        <MenuItem
          className="footer__item text-corpus"
          name="legal notices"
          as={NavLink}
          to="/legal-notice"
        >
          Mentions Légales
        </MenuItem>

        <MenuItem
          className="footer__item text-corpus"
          name="CGU"
          as={NavLink}
          to="/general-conditions-use"
        >
          Conditions Générales d&apos;Utilisation
        </MenuItem>

        <MenuItem className="footer__contact text-corpus" name="Contact">
          <span>
            Contactez-nous&nbsp;:{' '}
            <a href="mailto:obookgroove@gmail.com">obookgroove@gmail.com</a>
          </span>
        </MenuItem>
      </Menu>
    </Segment>
  );
}
