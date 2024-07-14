import React from 'react'

const ImageContainer = ({ src, alt }) => {
  return (
    <div className='image-container'>
        <img src={src} alt={alt} />
    </div>
  )
}

export default ImageContainer;