import { baseUrl } from "./baseUrl";

export const fetchRecipes = async () => {
   try {
    const response = await fetch(`${baseUrl}/api/recipes/`, {
        method: 'GET'
    })

    const recipeData = await response.json();
    return recipeData;

   } catch(error) {
    
    console.error('Error fetching recipes:', error);
    throw error;
   }
}

export const postARecipe = async (recipeData) => {
  try {
    const response = await fetch(`${baseUrl}/api/recipes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: recipeData 
    })

    if(response.ok) {
      const newRecipe = await response.json();
      return newRecipe;
    }

    } catch(error) {
       throw new Error('Failed to post a recipe');
    }
  }

export const unlikeFavoriteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${baseUrl}/api/recipes/${recipeId}/unlike/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to unlike a recipe');
      }

    } catch (error) {
      console.error('Error unliking a recipe:', error);
      throw error;
    }
  };

export const likeARecipe = async (recipeId) => {
    try {
      const response = await fetch(`${baseUrl}/api/recipes/${recipeId}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      if (!response.ok) {
        throw new Error('Failed to like a recipe');
      }

    } catch (error) {
      console.error('Error liking a recipe:', error);
      throw error;
    }
  };