import React, { useState } from 'react';
// import context
import { useRecipeContext } from '../../context/RecipeContext';
// import navigate object from react router dom
import { useParams, useNavigate } from 'react-router-dom';
// import icons
import { AiFillLike } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import components
import ImageContainer from '../ImageContainer/ImageContainer';
import UpdateForm from '../Form/UpdateForm';
// import fetching logic
import { deleteARecipe } from '../../utils/fetchRecipes';
// import styles
import './RecipeStyle.css';


const Recipe = ({ recipe, type }) => {

  // initialize state to trigger update form
  const [ edit, setEdit ] = useState(false);
  const navigate = useNavigate();

  // use context
  const { handleCurrentRecipe, allRecipes, handleFilterAllRecipes, favoriteRecipes, handleFavorites } = useRecipeContext();

  const { id } = useParams();
  console.log(id, 'id')

  if(!recipe) {
    recipe = allRecipes?.find((r) => r?.id === id);
  }
   
  // check if current recipe is in favorite recipes

  const isRecipeLiked = favoriteRecipes?.find(favRecipe => favRecipe?.id === recipe?.id);

  console.log(allRecipes, 'inside recipe')
  console.log(recipe, ' recipe')

  // format date strings
  const dateCreated = new Date(recipe?.date_created).toDateString();
  const dateUpdated = new Date(recipe?.date_updated).toDateString();

  // format passed array
  const formattedJSX = (arr) => {
    // split by new line
    const arrJSX = arr?.split('\n').map((item) => (
      // display each line on a new line
      <div key={item}>{item}</div>
    ));
    // return formatted jsx
    return arrJSX;
  }

  // format ingredients and instructions
  const ingredients = recipe?.ingredients;
  const formattedIngredients = formattedJSX(ingredients);

  const instructions = recipe?.instructions;
  const formattedInstructions = formattedJSX(instructions);

  // handle updating favorite recipes array
  const handleClick = (event) => {
    // do not open the recipe in a new page
    event.stopPropagation();
    // update state
    handleFavorites(recipe.id);
  } 

// display like button
  const LikeButton = ({ onClick }) => {
    return (
      // conditionally apply styling
      <div onClick={onClick} className={`like-button ${isRecipeLiked ? 'liked' : ''}`} >
        {/* react icon */}
        <AiFillLike />
      </div>)
  }

  // const display servings
  const Servings = () => {
    return ( <div className='border'>
      <div>Servings:</div><div className='servings'>{recipe?.servings}</div>
    </div> );
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
        <div className='recipe-preview-description'>{recipe?.description}</div>
        <Servings />
        <ImageContainer src={recipe?.image} alt={recipe?.title} />
      </>
    )
  }

  // display full recipe
  const recipeFull = () => {
    return (
      <>
        <h2>{recipe?.title}</h2>
        <div className="description-container">

          <div>{recipe?.description}</div>
          <div>
            <LikeButton onClick={handleClick}/>
          </div>
        </div>

        <div className='dates-container'>
          <div>Created on:<br/>{dateCreated}</div>
          <div>Updated on:<br/>{dateUpdated}</div>
        </div>


        <Servings />

        <div className='border'>{formattedIngredients}</div>
        <div className='border'>{formattedInstructions}</div>


        <ImageContainer src={recipe?.image} alt={recipe?.title} />

        {/* button container */}
        <div className='button-container'>
          <button><span onClick={()=> handleDeleteRecipe(recipe.id)}><MdDeleteForever /></span></button>
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
              recipe={recipe} 
            />}
      </>
  )
}

export default Recipe;