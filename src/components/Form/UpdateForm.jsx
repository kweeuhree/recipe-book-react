import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateForm = ({ recipe, updateAllRecipes, handleCurrentRecipe, setEdit }) => {
    
    const [ updateFormData, setUpdateFormData ] = useState({
        id: recipe.id,
        title: recipe.title ,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        servings: recipe.servings,
        image: recipe.image
    })

    const navigate = useNavigate();

    const handleChange = (event)=> {       
        const { name, value } = event.target;
        setUpdateFormData((prevUpdateFormData) => ({
            ...prevUpdateFormData,
            [name]: value
        }))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const recipeData = new FormData(event.target);
        try {
            const response = await fetch(`http://localhost:8000/api/recipes/${recipe.id}/`, {
                method: 'PUT',
                body: recipeData
            })
      
            if(response.ok) {
                const updatedRecipe = await response.json();
                handleCurrentRecipe(updatedRecipe);
                navigate(`/recipes/${updatedRecipe.id}/`);
                updateAllRecipes(updatedRecipe);  
                setEdit(false);
                console.log(updatedRecipe, 'updated recipe');              
            }
        } catch(error) {
            throw new Error('Error posting Recipe update');
        }
    }

  return (
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

    <label htmlFor="image">Image</label><br />
    <input 
        type="file" 
        name="image" 
        id="image" 
        onChange={handleChange} 
    /><br />

        <input type="submit" value="Submit" />
    </form>
  )
}

export default UpdateForm;