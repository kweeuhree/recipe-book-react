import React from 'react';
// import styles
import './ImageContainerStyle.css';
// import default image
import defaultImage from '../../assets/default-image.png';

const ImageContainer = ({ src = defaultImage, alt = 'Frying pan with a spatula' }) => {
  return (
    <div className='image-container'>
      {/* conditionally display image */}
        <img src={src} alt={alt} />
    </div>
  )
}

export default ImageContainer;