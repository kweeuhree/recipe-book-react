import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import components
import CreateForm from '../../components/Form/CreateForm';

const AddNewRecipePage = ({ updateAllRecipes, handleCurrentRecipe, handleLatestRecipe }) => {

  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();

  const postRecipe = async(recipeData) => {
    try {
      const response = await fetch('http://localhost:8000/api/recipes/', {
        method: 'POST',
        body: recipeData 
      })

      if(response.ok) {
        const newRecipe = await response.json(); 

        updateMessage('New Recipe saved!');
        handleLatestRecipe(newRecipe);
        updateAllRecipes(newRecipe);
      }

      setTimeout(() => {
        navigate('/recipes/');
      }, 500);

    } catch(error) {
      console.log(error);
      
      updateMessage('New Recipe is not saved.');
      throw new Error('Failed posting the recipe.');
      
    } finally {

      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  }

  return (
    <div className='create-from-container'>
      {/* form */}
      <CreateForm post={postRecipe} />
      <p>{message}</p>
    </div>
  )
}

export default AddNewRecipePage;