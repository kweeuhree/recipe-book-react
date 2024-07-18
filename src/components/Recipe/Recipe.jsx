import React, { useState } from 'react';
// import navigate object from react router dom
import { useNavigate } from 'react-router-dom';
// import icons
import { AiFillLike } from "react-icons/ai";
import { FaRegWindowClose, FaRegEdit } from "react-icons/fa";
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
import UpdateForm from '../Form/UpdateForm';
// import fetching logic
import { deleteARecipe } from '../../utils/fetchRecipes';
// import styles
import './RecipeStyle.css';


const Recipe = ({ handleLatestRecipe, updateAllRecipes, handleFilterAllRecipes, recipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, type }) => {

  // initialize state to trigger update form
  const [ edit, setEdit ] = useState(false);
  const navigate = useNavigate();
  // check if current recipe is in favorite recipes
  const isRecipeLiked = favoriteRecipes?.find(favRecipe => favRecipe.id === recipe.id);

  // format date strings
  const dateCreated = new Date(recipe.date_created).toDateString();
  const dateUpdated = new Date(recipe.date_updated).toDateString();

  // handle updating favorite recipes array
  const handleClick = (event) => {
    // do not open the recipe in a new page
    event.stopPropagation();
    // update state
    handleFavorites(recipe);
  } 

// display like button
  const LikeButton = ({ onClick }) => {
    return (
      // conditionally apply styling
      <div onClick={onClick} className={isRecipeLiked ? 'red' : 'white'} >
        {/* react icon */}
        <AiFillLike />
      </div>)
  }

  //  open notes in a new page
  const handleOpenNotes = (event) => {
    // do not open recipe in a new page
    event.stopPropagation(); 
    // navigate to specific notes page
    navigate(`/notes/${recipe.id}/`);
  }

  // handle delete a recipe
  const handleDeleteRecipe = async (recipeId) => {
   try {
    // send a database request to delete a specific recipe
    const response = await deleteARecipe(recipeId);
    // if response is true
    if(response) {
      // filter recipes array
      handleFilterAllRecipes(recipeId);
      // navigate to all recipes page
      navigate('/recipes/');
    }
   
   } catch (error) {
    throw new Error('Failed to delete a recipe');
   }
  }

  // trigger appearance of update form
  const handleUpdateRecipe = () => {
    setEdit(true);
  }

  // display recipe preview
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

  // display full recipe
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

        {/* button container */}
        <div className='button-container'>
          <button><span onClick={()=> handleDeleteRecipe(recipe.id)}><FaRegWindowClose /></span></button>
          <button onClick={handleOpenNotes}>Notes</button>
          <button><span onClick={()=> handleUpdateRecipe()}><FaRegEdit /></span></button>
        </div>
      </>
    )
  }

  return (
      <>
      {/* on click update state */}
          <div className='recipe' onClick={()=> handleCurrentRecipe(recipe)}>
            {/* conditionally display a preview or a full recipe */}
            { type === 'full' ? recipeFull() : recipePreview() }
          </div>
          
          {/* trigger appearance of update form */}
          { edit && 
            <UpdateForm
              setEdit={setEdit} 
              updateAllRecipes={updateAllRecipes} 
              handleLatestRecipe={handleLatestRecipe} 
              handleCurrentRecipe={handleCurrentRecipe} 
              recipe={recipe} 
            />}
      </>
  )
}

export default Recipe;