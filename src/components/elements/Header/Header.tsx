import React, { Component } from 'react'
import { MenuItem, Menu, Segment, Button, GridColumn, Grid } from 'semantic-ui-react'
import logo from '../../../assets/logo/svg/logo2_bleuvert.svg'
import './Header.scss'



function Header() {
  
      return (
        
          <Segment inverted className="header">
            <Menu inverted pointing secondary stackable className="header__menu">
                 <MenuItem className="header__logo text-chapo" link name="logo">
                   <img className="header__img" src={logo} alt="logo" />
                 </MenuItem>
            </Menu>
            <Menu inverted pointing secondary stackable className="header__menu">
                 <MenuItem className="header__item text-chapo" link name='Accueil'>
                  Accueil
                 </MenuItem>
            
                  <MenuItem className="header__item text-chapo" link name='Profil'>
                   Profil
                  </MenuItem>
             
                  <MenuItem className="header__item text-chapo" link name='Bibliothèque'>
                    Bibliothèque
                  </MenuItem>
        
                <MenuItem>
                  <Button primary className="button__primary text-chapo">
                     Log In
                  </Button>
                </MenuItem>  

            </Menu>
          </Segment>
   
        
      )
  }
  


export default Header

    
 