import React from 'react';
import { useLocation } from 'react-router-dom';
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
// import styles
import './RecipeStyle.css';

const Recipe = ({ recipe, handleFavorites, handleCurrentRecipe }) => {

  const location = useLocation();
  const pathname = location.pathname;

  const recipePreview = () => {
    return (
      <>
        <h3>{recipe.title}</h3>
        <div>{recipe.description}</div>
        <div className='servings'>Servings: <span>{recipe.servings}</span></div>
        <div>{recipe.date_isLiked}</div>
        <ImageContainer src={recipe.image} alt={recipe.title} />
      </>
    )
  }

  const recipeFull = () => {
    return (
      <>
        <h2>{recipe.title}</h2>
        <div>{recipe.description}</div>
        <div>{recipe.ingredients}</div>
        <div>{recipe.instructions}</div>
        <div>{recipe.servings}</div>
        <div>{recipe.date_created}</div>
        <div>{recipe.date_updated}</div>
        <div>{recipe.date_isLiked}</div>
        <ImageContainer src={recipe.image} alt={recipe.title} />
      </>
    )
  }

  return (
    <div className='recipe' onClick={handleCurrentRecipe}>
        { pathname === '/recipe/:id' ? recipeFull() : recipePreview() }
    </div>
  )
}

export default Recipe;