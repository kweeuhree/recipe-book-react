import React from 'react'

const Footer = () => {

    const today = new Date();
    const year = today.getFullYear();
    const author = 'Veronika Kolesnikova';

  return (
    <footer>&copy; {year}, {author}</footer>
  )
}

export default Footer;