import React, { useState } from 'react'

const CreateForm = ({ type, post }) => {
    const [ FormData, setFormData ] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        servings: 0,
        image: ''
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        const recipeData = new FormData(event.target);
        post(recipeData);
    }
    
    const handleChange = (event) => {
        // destructure event object
        const { target: {name, value} } = event;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }
  
    return (
    <form onSubmit={handleSubmit}>

    <label htmlFor="title">Recipe Title</label><br />
    <input 
        type="text" 
        name="title"
        id="title" 
        value={FormData.title} 
        onChange={handleChange} 
        required 
        placeholder="Enter the recipe title"
    /><br />

    <label htmlFor="description">Description</label><br />
    <input 
        type="text" 
        name="description" 
        id="description" 
        value={FormData.description} 
        onChange={handleChange} 
        required 
        placeholder="Brief description of the recipe"
    /><br />

    <label htmlFor="ingredients">Ingredients</label><br />
    <input 
        type="text" 
        name="ingredients" 
        id="ingredients" 
        value={FormData.ingredients} 
        onChange={handleChange} 
        required 
        placeholder="List of ingredients"
    /><br />

    <label htmlFor="instructions">Instructions</label><br />
    <input 
        type="text" 
        name="instructions" 
        id="instructions" 
        value={FormData.instructions} 
        onChange={handleChange} 
        required 
        placeholder="Step-by-step instructions"
    /><br />

    <label htmlFor="servings">Servings</label><br />
    <input 
        type="number" 
        name="servings" 
        id="servings" 
        value={FormData.servings} 
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

        <input type="submit" />
        
    </form>
  )
}

export default CreateForm;