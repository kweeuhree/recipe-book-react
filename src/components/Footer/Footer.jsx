import React from 'react'

const Footer = () => {
    // get current day and year
    const today = new Date();
    const year = today.getFullYear();

    const author = 'Veronika Kolesnikova';

  return (
    // display footer
    <footer>&copy; {year}, {author}</footer>
  )
}

export default Footer;