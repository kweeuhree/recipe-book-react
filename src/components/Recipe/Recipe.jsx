import React from 'react';
// import icons
import { AiFillLike } from "react-icons/ai";
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
// import styles
import './RecipeStyle.css';

const Recipe = ({ recipe, handleFavorites, onClick, handleCurrentRecipe, type }) => {

  // console.log(recipe.isLiked, 'isliked in Recipe')

  const handleClick = (event, recipe) => {
    handleFavorites(event, recipe);
  } 

  const TitleSection = ({ headerTag , title, recipe }) => {

    return (
      <div className='title-section'>
         {React.createElement(headerTag, {}, title)}
         <LikeButton onClick={() =>handleClick(recipe)}/>
      </div>
    )
  }

  const LikeButton = ({ onClick }) => {

    const handleButtonClick = (event) => {
      event.stopPropagation();
      onClick(event);
    }

    return (
      <div onClick={onClick}>
        <AiFillLike className={recipe?.isLiked ? 'red' : ''} />
      </div>
    );
  }

  const recipePreview = () => {
    return (
      <>
       <TitleSection headerTag="h3" title={recipe?.title} recipe={recipe} />
        <div>{recipe?.description}</div>
        <div className='servings'>Servings: <span>{recipe?.servings}</span></div>
        <ImageContainer src={recipe?.image} alt={recipe?.title} />
      </>
    )
  }

  const recipeFull = () => {
    return (
      <>
        <TitleSection headerTag="h2" title={recipe.title} recipe={recipe}/>
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