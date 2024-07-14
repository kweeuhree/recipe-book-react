import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const links = [
        ['home'],
        ['all', 'all recipes'],
        ['favorites', 'favorite recipes'],
        ['add', 'add new recipe']
    ];

    const linksJSX =  links.map((link) => (
        <li key={link[0]}>
            {/* display a proper link name */}
            <Link to={`/${link[0]}/`}>{link[1] ? link[1] : link[0]}</Link>
        </li>
    ));

  return (
    <nav>
        <ul>
            {linksJSX}
        </ul>
    </nav>
  )
}

export default NavBar;