import React from 'react';
import Recipe from '../../components/Recipe/Recipe';

const HomePage = ({ latestRecipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, currentRecipe }) => {
  

  return (
    <main>
      {/* latest recipe */}
      <div className='latestRecipe' onClick={() => handleCurrentRecipe(latestRecipe)}>
           { latestRecipe && 
            <Recipe 
              key={'latestRecipe' + latestRecipe.id} 
              recipe={latestRecipe}
              handleFavorites={handleFavorites}
              handleCurrentRecipe={handleCurrentRecipe}
             /> }
      </div>

      {/* favorite recipes */}
      <div className='favorite-carousel'>
        { favoriteRecipes.length > 0  ?
          favoriteRecipes.map((recipe) => (
            <Recipe 
              key={recipe.id} 
              recipe={recipe}
              handleFavorites={handleFavorites}
              handleCurrentRecipe={handleCurrentRecipe}
               />
          )) :
          <p>No favorite recipes yet!</p>
        }
      </div>
    </main>
  )
}

export default HomePage;