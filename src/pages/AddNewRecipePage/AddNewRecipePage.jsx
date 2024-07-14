import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import components
import CreateForm from '../../components/Form/CreateForm';

const AddNewRecipePage = () => {

  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();

  const postRecipe = async(recipeData) => {
    try {
      const response = await fetch('http://localhost:8000/api/recipes/', {
        method: 'POST',
        body: recipeData 
      })

      if(response.ok) {
        updateMessage('New Recipe saved!');
      }

      setTimeout(() => {
        navigate('/all/');
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
      <CreateForm type='recipe' post={postRecipe} />
      <p>{message}</p>
    </div>
  )
}

export default AddNewRecipePage;