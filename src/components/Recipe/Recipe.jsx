import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import icons
import { AiFillLike } from "react-icons/ai";
import { FaRegWindowClose, FaRegEdit } from "react-icons/fa";
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
import UpdateForm from '../Form/UpdateForm';
// import styles
import './RecipeStyle.css';

const Recipe = ({ handleLatestRecipe, updateAllRecipes, handleFilterAllRecipes, recipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, type }) => {

  const [ edit, setEdit ] = useState(false);
  const navigate = useNavigate();
  const isRecipeLiked = favoriteRecipes?.find(favRecipe => favRecipe.id === recipe.id);
  const dateCreated = new Date(recipe.date_created).toDateString();
  const dateUpdated = new Date(recipe.date_updated).toDateString();
  // console.log(isRecipeLiked)

  const handleClick = (event) => {
    event.stopPropagation();
    handleFavorites(recipe);
  } 


  const LikeButton = ({ onClick }) => {
    return (
      <div onClick={onClick} className={isRecipeLiked ? 'red' : 'white'} >
        <AiFillLike />
      </div>)
  }

  const handleOpenNotes = (event) => {
    event.stopPropagation(); 
    navigate(`/notes/${recipe.id}`);
  }

  const recipePreview = () => {
    return (
      <>
        <h2>{recipe?.title}</h2>
        <LikeButton onClick={handleClick} />
        <div>{recipe?.description}</div>
        <div className='servings'>Servings: <span>{recipe?.servings}</span></div>
        <ImageContainer src={recipe?.image} alt={recipe?.title} />
      </>
    )
  }

  const handleDeleteRecipe = async (recipeId) => {
    await fetch(`http://3.145.94.65/api/recipes/${recipeId}`, {
      method: 'DELETE'
    })
    handleFilterAllRecipes(recipeId);
    navigate('/recipes/');
  }

  const handleUpdateRecipe = () => {
    setEdit(true);
  }

  const recipeFull = () => {
    return (
      <>
        <h2>{recipe?.title}</h2>
        <LikeButton onClick={handleClick}/>
        <div>{recipe?.description}</div>
        <div>{recipe.ingredients}</div>
        <div>{recipe.instructions}</div>
        <div>{recipe.servings}</div>
        <div>{dateCreated}</div>
        <div>{dateUpdated}</div>
        <ImageContainer src={recipe.image} alt={recipe.title} />
        <div className='button-container'>
          <button onClick={handleOpenNotes}>Notes</button>
          <button><span onClick={()=> handleDeleteRecipe(recipe.id)}><FaRegWindowClose /></span></button>
          <button><span onClick={()=> handleUpdateRecipe()}><FaRegEdit /></span></button>
        </div>
      </>
    )
  }

  return (
      <>
          <div className='recipe' onClick={()=> handleCurrentRecipe(recipe)}>
            { type === 'full' ? recipeFull() : recipePreview() }
          </div>
          { edit && <UpdateForm setEdit={setEdit} updateAllRecipes={updateAllRecipes} handleLatestRecipe={handleLatestRecipe} handleCurrentRecipe={handleCurrentRecipe} recipe={recipe} />}
      </>
  )
}

export default Recipe;