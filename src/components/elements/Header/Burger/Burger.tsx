import { Icon, MenuItem, Menu } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'

export type BurgerProps={
  image: HTMLElement
}

export default function Burger () {
  return (
    <MediaQuery maxWidth={766}>
      <Menu inverted icon className="header__burger">
          <MenuItem name='bars' className="header__burger-item">
                <Icon name='bars' className="header__burger-icon"/>
          </MenuItem>
      </Menu>
  </MediaQuery>
  )
}
