import React from 'react';
// import icons
import { AiFillLike } from "react-icons/ai";
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
// import styles
import './RecipeStyle.css';

const Recipe = ({ recipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, type }) => {

  const isRecipeLiked = favoriteRecipes?.filter(favRecipe => favRecipe.id !== recipe.id);
  console.log(favoriteRecipes, 'favs in Recipe')

  const handleClick = (event) => {
    event.stopPropagation();
    handleFavorites(recipe);
  } 


  const LikeButton = ({ onClick }) => {
    return (
      <div onClick={onClick} className={isRecipeLiked ? 'red' : ''} >
        <AiFillLike />
      </div>)
  }

  const recipePreview = () => {
    return (
      <>
        <h2>{recipe.title}</h2>
        <LikeButton onClick={handleClick} />
        <div>{recipe?.description}</div>
        <div className='servings'>Servings: <span>{recipe?.servings}</span></div>
        <ImageContainer src={recipe?.image} alt={recipe?.title} />
      </>
    )
  }

  const recipeFull = () => {
    return (
      <>
        <h2>{recipe.title}</h2>
        <LikeButton onClick={handleClick}/>
        <div>{recipe.description}</div>
        <div>{recipe.ingredients}</div>
        <div>{recipe.instructions}</div>
        <div>{recipe.servings}</div>
        <div>{recipe.date_created}</div>
        <div>{recipe.date_updated}</div>
        <ImageContainer src={recipe.image} alt={recipe.title} />
      </>
    )
  }

  return (
          <div className='recipe' onClick={()=> handleCurrentRecipe(recipe)}>
            { type === 'full' ? recipeFull() : recipePreview() }
          </div>
  )
}

export default Recipe;