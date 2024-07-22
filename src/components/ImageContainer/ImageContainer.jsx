import React from 'react';
// import styles
import './ImageContainerStyle.css';
// import default image
import defaultImage from '../../assets/default-image.png';

const ImageContainer = ({ src, alt }) => {
  return (
    <div className='image-container'>
      {/* conditionally display image */}
        <img src={src ? src : defaultImage} alt={alt ? alt : 'Frying pan with a spatula'} />
    </div>
  )
}

export default ImageContainer;