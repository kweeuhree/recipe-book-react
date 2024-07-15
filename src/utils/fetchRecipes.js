export const fetchRecipes = async () => {
   try {
    const response = await fetch('http://localhost:8000/api/recipes/', {
        method: 'GET'
    })

    const recipeData = await response.json();
    // console.log('received recipe data inside fetchRecipes', recipeData);
    
    return recipeData;

   } catch(error) {
    
    console.error('Error fetching recipes:', error);
    throw error;
   }
}

export const unlikeFavoriteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${recipeId}/unlike/`, {
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
  console.log(recipeId)
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${recipeId}/like/`, {
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