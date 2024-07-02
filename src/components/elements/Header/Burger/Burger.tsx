import { Icon, MenuItem, Menu } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import MenuMobile from '../MenuMobile/MenuMobile';

export type BurgerProps = {
  image: HTMLElement;
};

export default function Burger() {
  return (
    <MediaQuery maxWidth={766}>
      <Menu inverted icon className="header__burger">
        <MenuItem name="bars" className="header__burger-item">
          <Icon name="bars" className="header__burger-icon" />
        </MenuItem>
      </Menu>
      <MenuMobile />
    </MediaQuery>
  );
}
