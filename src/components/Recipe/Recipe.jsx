import React from 'react'
import ImageContainer from '../ImageContainer/ImageContainer';

const Recipe = ({ recipe, handleFavorites, handleCurrentRecipe }) => {
  
  return (
    <div className='recipe'>
      <h2>{recipe.title}</h2>
      <div>{recipe.description}</div>
      <div>{recipe.ingredients}</div>
      <div>{recipe.instructions}</div>
      <div>{recipe.servings}</div>
      <div>{recipe.date_created}</div>
      <div>{recipe.date_updated}</div>
      <div>{recipe.date_isLiked}</div>
      <ImageContainer src={recipe.image} alt={recipe.title} />


    </div>
  )
}

export default Recipe;