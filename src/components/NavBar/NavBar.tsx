import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const links = ['home', 'all', 'favorites'];

  return (
    <nav>
        <ul>
            {
                links.map((link) => (
                    <li key={link}>
                        <Link to={`/${link}`}>{link}</Link>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default NavBar;