import React from 'react'

const Footer = () => {

    const today = Date.now();
    const year = today.getFullYear();
    const author = 'Veronika Kolesnikova';

  return (
    <div>&copy; {year}, {author}</div>
  )
}

export default Footer;