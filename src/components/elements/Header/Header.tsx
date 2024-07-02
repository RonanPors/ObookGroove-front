import React, { Component } from 'react'
import { MenuItem, Menu, Segment, Button } from 'semantic-ui-react'
import logo from '../../../assets/logo/svg/logo2_bleuvert.svg'
import './Header.scss'
import { NavLink } from 'react-router-dom'
import MediaQuery from 'react-responsive'



function Header() {
  
      return (
        
          <Segment inverted className="header">
            <Menu inverted pointing secondary stackable className="header__menu">
                 <MenuItem className="header__logo text-chapo" link name="logo">
                   <img className="header__img" src={logo} alt="logo" />
                 </MenuItem>
            </Menu>
            
            <MediaQuery minWidth={915}>
             <Menu inverted pointing secondary stackable className="header__menu">
               <NavLink to={'/'}>
                  <MenuItem className="header__item text-chapo" link name='Accueil' as={NavLink} to="/">
                   Accueil
                  </MenuItem>
               </NavLink>

               <NavLink to={'/Profile'}>
                  <MenuItem className="header__item text-chapo" link name='Profil' as={NavLink} to="/Profile">
                   Profil
                  </MenuItem>
               </NavLink>
             
                  <MenuItem className="header__item text-chapo" link name='Bibliothèque' as={NavLink} to="/Library" >
                    Bibliothèque
                  </MenuItem>
        
                <MenuItem>
                  <Button primary className="button__primary text-chapo">
                     Log In
                  </Button>
                </MenuItem>  
             </Menu> 
            </MediaQuery>
            
          </Segment>
   
        
      )
  }
  


export default Header

    
 