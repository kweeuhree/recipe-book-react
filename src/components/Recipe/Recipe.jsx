import React from 'react';
// import icons
import { AiFillLike } from "react-icons/ai";
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
// import styles
import './RecipeStyle.css';

const Recipe = ({ recipe, handleFavorites, onClick, handleCurrentRecipe, type }) => {

  console.log(recipe, 'recipe in Recipe');

  const TitleSection = ({ headerTag , title }) => {
    return (
      <div className='title-section'>
         {React.createElement(headerTag, {}, title)}
         <LikeButton />
      </div>
    )
  }

  const LikeButton = () => {
    return (
      <div>
        <AiFillLike className={recipe.date_isLiked ? 'red' : ''} />
      </div>
    );
  }

  const recipePreview = () => {
    return (
      <>
       <TitleSection headerTag="h3" title={recipe.title}/>
        <div>{recipe.description}</div>
        <div className='servings'>Servings: <span>{recipe.servings}</span></div>
        <ImageContainer src={recipe.image} alt={recipe.title} />
      </>
    )
  }

  const recipeFull = () => {
    return (
      <>
        <TitleSection headerTag="h2" title={recipe.title}/>
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