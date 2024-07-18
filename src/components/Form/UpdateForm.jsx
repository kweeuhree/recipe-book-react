import React, { useState } from 'react'
// import navigate object from react router dom
import { useNavigate } from 'react-router-dom'
// import fetching logic
import { updateARecipe } from '../../utils/fetchRecipes'

const UpdateForm = ({ recipe, updateAllRecipes, handleCurrentRecipe, setEdit, handleLatestRecipe }) => {
    // intialize update form data state
    const [ updateFormData, setUpdateFormData ] = useState({
        id: recipe.id,
        title: recipe.title ,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        servings: recipe.servings,
        image: null
    })

    const navigate = useNavigate();

    // handle form state change
    const handleChange = (event)=> {   
         // destructure event object    
        const { name, value } = event.target;
        // update state
        setUpdateFormData((prevUpdateFormData) => ({
            ...prevUpdateFormData,
            [name]: value
        }))
    }
    // handle form submit
    const handleSubmit = async (event) => {
        // prevent default behavior
        event.preventDefault();
         // set form data object with recipe data
        const recipeData = new FormData(event.target);
        try {
            // send database request
            const updatedRecipe = await updateARecipe(recipe.id, recipeData);
            // update recipes states
            handleCurrentRecipe(updatedRecipe);
            handleLatestRecipe(updatedRecipe);
            updateAllRecipes(updatedRecipe);
            // remove update form
            setEdit(false);
            // navigate to specific recipe page
            navigate(`/recipes/${updatedRecipe.id}/`);
            console.log(updatedRecipe, 'updated recipe');   
                           
        } catch(error) {
            throw new Error('Error posting Recipe update');
        }
    }

  return (
    // display form
    <form id="update-recipe" onSubmit={handleSubmit}>
            <label htmlFor="title">Recipe Title</label><br />
    <input 
        type="text" 
        name="title"
        id="title" 
        value={updateFormData.title} 
        onChange={handleChange} 
        required 
        placeholder="Enter the recipe title"
    /><br />

    <label htmlFor="description">Description</label><br />
    <textarea 
        type="text" 
        name="description" 
        id="description" 
        value={updateFormData.description} 
        onChange={handleChange} 
        required 
        placeholder="Brief description of the recipe"
    /><br />

    <label htmlFor="ingredients">Ingredients</label><br />
    <textarea 
        type="text" 
        name="ingredients" 
        id="ingredients" 
        value={updateFormData.ingredients} 
        onChange={handleChange} 
        required 
        placeholder="List of ingredients"
    /><br />

    <label htmlFor="instructions">Instructions</label><br />
    <textarea 
        type="text" 
        name="instructions" 
        id="instructions" 
        value={updateFormData.instructions} 
        onChange={handleChange} 
        required 
        placeholder="Step-by-step instructions"
    /><br />

    <label htmlFor="servings">Servings</label><br />
    <input 
        type="number" 
        name="servings" 
        id="servings" 
        value={updateFormData.servings} 
        onChange={handleChange} 
        required 
        placeholder="Number of servings"
    /><br />

        <input type="submit" value="Submit" />
    </form>
  )
}

export default UpdateForm;