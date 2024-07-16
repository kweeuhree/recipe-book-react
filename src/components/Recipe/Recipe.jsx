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

const Recipe = ({ updateAllRecipes, handleFilterAllRecipes, recipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, type }) => {

  const [ edit, setEdit ] = useState(false);
  const navigate = useNavigate();
  const isRecipeLiked = favoriteRecipes?.find(favRecipe => favRecipe.id === recipe.id);
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
    await fetch(`http://localhost:8000/api/recipes/${recipeId}`, {
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
        <div>{recipe.date_created}</div>
        <div>{recipe.date_updated}</div>
        <ImageContainer src={recipe.image} alt={recipe.title} />
        <button onClick={handleOpenNotes}>Notes</button>
        <div><span onClick={()=> handleDeleteRecipe(recipe.id)}><FaRegWindowClose /></span></div>
        <div><span onClick={()=> handleUpdateRecipe()}><FaRegEdit /></span></div>
      </>
    )
  }

  return (
      <>
          <div className='recipe' onClick={()=> handleCurrentRecipe(recipe)}>
            { type === 'full' ? recipeFull() : recipePreview() }
          </div>
          { edit && <UpdateForm setEdit={setEdit} handleCurrentRecipe={handleCurrentRecipe} recipe={recipe} updateAllRecipes={updateAllRecipes}/>}
      </>
  )
}

export default Recipe;