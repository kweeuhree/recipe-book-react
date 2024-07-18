import React from 'react';
// import link for navigation
import { Link } from 'react-router-dom';
// import styles
import './NavBarStyle.css';

const NavBar = () => {
    // links data
    const links = [
        ['/', 'home'],
        ['/recipes/', 'all recipes'],
        ['/favorites/', 'favorite recipes'],
        ['/add/', 'add new']
    ];

    // links jsx
    const linksJSX =  links.map((link) => (
        <li key={link[0]}>
            {/* display a proper link name */}
            <Link to={link[0]}>{link[1]}</Link>
        </li>
    ));

  return (
    // display navigation
    <nav>
        <ul>
            {linksJSX}
        </ul>
    </nav>
  )
}

export default NavBar;