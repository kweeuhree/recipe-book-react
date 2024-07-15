import React from 'react';
import Recipe from '../../components/Recipe/Recipe';

const HomePage = ({ latestRecipe, favoriteRecipes, handleFavorites, handleCurrentRecipe, currentRecipe }) => {
  
// console.log(latestRecipe, 'latest recipe in homepage')
  return (
    <main>
      {/* latest recipe */}
      <div className='latestRecipe' onClick={() => handleCurrentRecipe(latestRecipe)}>
        <p>Latest Recipe:</p>
           { latestRecipe && 
            <Recipe 
              key={'latestRecipe' + latestRecipe.id} 
              recipe={latestRecipe}
              type='preview'
              handleFavorites={handleFavorites}
              handleCurrentRecipe={handleCurrentRecipe}
              onClick={()=> handleCurrentRecipe(latestRecipe)}
             /> }
      </div>

      {/* favorite recipes */}
      <div className='favorite-carousel'>
        { favoriteRecipes.length > 0  ?
          favoriteRecipes.map((recipe) => (
            <Recipe 
              key={recipe?.id} 
              type='preview'
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