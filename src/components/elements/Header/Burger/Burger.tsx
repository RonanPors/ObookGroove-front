import { MenuItem, Menu } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import MenuMobile from '../MenuMobile/MenuMobile';

import './Burger.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { toggleMenu } from '../../../../store/reducers/userReducer';

export type BurgerProps = {
  image: HTMLElement;
};

export default function Burger() {
  const dispatch = useAppDispatch();
  const menuIsOpen = useAppSelector((state) => state.user.menuIsOpen);

  return (
    <MediaQuery maxWidth={767}>
      <Menu inverted icon className="header__burger">
        <MenuItem
          className={
            menuIsOpen ? 'header__burger-item is-open' : 'header__burger-item'
          }
          onClick={() => dispatch(toggleMenu())}
        >
          <div>
            <span />
            <span />
            <span />
            <span />
          </div>
        </MenuItem>
      </Menu>
      <MenuMobile />
    </MediaQuery>
  );
}
