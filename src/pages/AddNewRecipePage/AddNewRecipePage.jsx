import React, { useState } from 'react'
//  import navigate object from react router dom
import { useNavigate } from 'react-router-dom';
// import fetching logic 
import { postARecipe } from '../../utils/fetchRecipes';
// import components
import CreateForm from '../../components/Form/CreateForm';
// import context
import { useRecipeContext } from '../../context/RecipeContext';


const AddNewRecipePage = () => {
  // initialize state to store new recipe status message
  const [ message, setMessage ] = useState('');
  // use context
  const { handleLatestRecipe, updateAllRecipes } = useRecipeContext();
  const navigate = useNavigate();
  
// handle posting a new recipe
  const postRecipe = async (recipeData) => {
    try {
      // send database request to post a new recipe
        const newRecipe = await postARecipe(recipeData); 
        // update status message
        updateMessage('New Recipe saved!');
        // update recipe states
        handleLatestRecipe(newRecipe);
        updateAllRecipes(newRecipe);
        // navigate to all recipes page after a timeout
        setTimeout(() => {
          navigate('/recipes/');
        }, 500);
  

    } catch(error) {
      console.log(error);
      // update status message
      updateMessage('New Recipe is not saved.');
      throw new Error('Failed posting the recipe.');
      
    } finally {
      // after a timeout, reset status message regardless of outcome
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  // handle update status message
  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  }

  return (
    <div className='create-from-container'>
      {/* form */}
      <CreateForm post={postRecipe} />
      {/* status message */}
      <p>{message}</p>
    </div>
  )
}

export default AddNewRecipePage;