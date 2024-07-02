import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import logo from '../../../assets/logo/svg/logo2_blanc.svg';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
  return (
    <Segment inverted className="footer ">
      <Menu stackable inverted pointing secondary className="footer__menu">
       
        <NavLink to={'/member/books'}>
          <MenuItem className="footer__logo" link name="logo" as={NavLink} to="/member/books">
            <img className="footer__img" src={logo} alt="logo" />
          </MenuItem>
        </NavLink>

        <NavLink to={'/legal-notice'}>
          <MenuItem
            className="footer__item text-corpus"
            link
            name="legal notices" as={NavLink} to="/legal-notice">
            Mentions Légales
          </MenuItem>
        </NavLink>

        <NavLink to={'/general-conditions-use'}>
          <MenuItem className="footer__item text-corpus" link name="CGU" as={NavLink} to="/general-conditions-use">
            Conditions Générales d&apos;Utilisation
          </MenuItem>
        </NavLink>


        <MenuItem className="footer__contact text-corpus" name="Contact">
          <span>
            Contactez-nous{' '}
            <a href="mailto:obookgroove@gmail.com"> obookgroove@gmail.com</a>
          </span>
        </MenuItem>
      </Menu>
    </Segment>
  );
}
