import React, { Component } from 'react'
import { MenuItem, Menu, Segment, Button, Icon } from 'semantic-ui-react'
import './Burger/Burger'
import logo from '../../../assets/logo/svg/logo2_bleuvert.svg'
import './Header.scss'
import { NavLink } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Burger from './Burger/Burger'



function Header() {
  
      return (
          <Segment inverted className="header">

            <NavLink to={'/member/books'}>
              <Menu inverted pointing secondary stackable className="header__menu">
                  <MenuItem className="header__logo text-chapo" link name="logo" as={NavLink} to="/member/books">
                    <img className="header__img" src={logo} alt="logo" />
                  </MenuItem>
              </Menu>
            </NavLink>
            
            <MediaQuery minWidth={766}>
             <Menu inverted pointing secondary stackable className="header__menu">
                <NavLink to={'/member/books'}>
                  <MenuItem className="header__item text-chapo" link name='Accueil' as={NavLink} to="/member/books">
                   Accueil
                  </MenuItem>
                </NavLink>

                <NavLink to={'/member/profile'}>
                  <MenuItem className="header__item text-chapo" link name='Profil' as={NavLink} to="/member/profile">
                   Profil
                  </MenuItem>
                </NavLink>
             
                <NavLink to={'/member/library'}>
                  <MenuItem className="header__item text-chapo" link name='Bibliothèque' as={NavLink} to="/member/library" >
                    Bibliothèque
                  </MenuItem>
                 </NavLink>
        
                <MenuItem>
                  <Button primary className="header__button button__primary text-chapo">
                     Log In
                  </Button>
                </MenuItem>  
             </Menu> 
            </MediaQuery>

            <Burger />

          </Segment>
      )
  }
  


export default Header

    
 