import React from 'react';
import { Navigate } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';

const HomePage = ({ latestRecipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, currentRecipe }) => {
  

  return (
    <main>
      {/* latest recipe */}
      <div className='latestRecipe' onClick={() => handleCurrentRecipe(latestRecipe)}>
        {latestRecipe}
      </div>

      {/* favorite recipes */}
      <div className='favorite-carousel'>
        {
          favoriteRecipes.map((recipe) => (
            <Recipe 
              key={recipe.id} 
              recipe={recipe}
              handleFavorites={handleFavorites}
              handleCurrentRecipe={handleCurrentRecipe}
               />
          ))
        }
      </div>
    </main>
  )
}

export default HomePage;