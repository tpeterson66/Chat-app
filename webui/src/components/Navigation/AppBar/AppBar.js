import React from 'react';
import NavItem from '../../../components/NavItem/NavItem'
import { NavLink } from 'react-router-dom'

export default function AppBar(props) {

  let links = ["Chat", "Blog", "Login"]
  let linksOutput = links.map((link, index) => {
    return (
      <NavLink key={index} to={link.toLowerCase()} activeClassName="w3-light-blue"> <NavItem link={link} />  </NavLink>
    )
  });

  return (
    <div className="w3-bar w3-top w3-xlarge w3-indigo">
      <NavLink to={'/'} exact activeClassName="w3-light-blue"> <NavItem link="Home" />  </NavLink>
      {linksOutput}
    </div>
  );
};