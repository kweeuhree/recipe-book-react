import React, { useState } from 'react'

const CreateForm = ({ post }) => {
    // intialize create form data state
    const [ CreateFormData, setCreateFormData ] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        servings: 0,
        image: ''
    })

    // handle form submit
    const handleSubmit = (event) => {
        // prevent default behavior
        event.preventDefault();
        // set form data object with recipe data
        const recipeData = new FormData(event.target);
        // handle posting a new recipe
        post(recipeData);
    }
    
    // handle form state change
    const handleChange = (event) => {
        // destructure event object
        const { target: {name, value} } = event;
        // update state
        setCreateFormData((prevCreateFormData) => ({
            ...prevCreateFormData,
            [name]: value
        }))
    }
  
    return (
        // display form
    <form id="create-recipe" onSubmit={handleSubmit}>

    <label htmlFor="title">Recipe Title</label><br />
    <input 
        type="text" 
        name="title"
        id="title" 
        value={CreateFormData.title} 
        onChange={handleChange} 
        required 
        placeholder="Enter the recipe title"
    /><br />

    <label htmlFor="description">Description</label><br />
    <textarea 
        type="text" 
        name="description" 
        id="description" 
        value={CreateFormData.description} 
        onChange={handleChange} 
        required 
        placeholder="Brief description of the recipe"
    /><br />

    <label htmlFor="ingredients">Ingredients</label><br />
    <textarea 
        type="text" 
        name="ingredients" 
        id="ingredients" 
        value={CreateFormData.ingredients} 
        onChange={handleChange} 
        required 
        placeholder="List of ingredients"
    /><br />

    <label htmlFor="instructions">Instructions</label><br />
    <textarea 
        type="text" 
        name="instructions" 
        id="instructions" 
        value={CreateFormData.instructions} 
        onChange={handleChange} 
        required 
        placeholder="Step-by-step instructions"
    /><br />

    <label htmlFor="servings">Servings</label><br />
    <input 
        type="number" 
        name="servings" 
        id="servings" 
        value={CreateFormData.servings} 
        onChange={handleChange} 
        required 
        placeholder="Number of servings"
    /><br />

        <input type="submit" />
        
    </form>
  )
}

export default CreateForm;