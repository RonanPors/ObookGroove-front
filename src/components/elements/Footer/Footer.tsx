import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import logo from '../../../assets/logo/svg/logo2_blanc.svg';

import './Footer.scss';

export default function Footer() {
  return (
    <Segment inverted className="footer ">
      <Menu stackable inverted pointing secondary className="footer__menu">
        <MenuItem className="footer__logo" link name="logo">
          <img className="footer__img" src={logo} alt="logo" />
        </MenuItem>
        <MenuItem
          className="footer__item text-corpus"
          link
          name="legal notices"
        >
          Mentions Légales
        </MenuItem>
        <MenuItem className="footer__item text-corpus" link name="CGU">
          Conditions Générales d&apos;Utilisation
        </MenuItem>
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
